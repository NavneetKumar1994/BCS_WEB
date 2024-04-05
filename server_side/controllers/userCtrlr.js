const userModel = require('../models/userModels');
const doctorModel = require('../models/doctorModels');
const expertModel = require('../models/expertModel');
const appointmentModel = require('../models/appointmentModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const cloudinary = require('cloudinary');

exports.registerController = async(req,res) => {
     try{
          

          const existingUser = await userModel.findOne({email:req.body.email});
          if(existingUser){
               return res.status(200).send({
                    message: "User already exists",
                    success: false
               })
          }
          
          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          req.body.password = hashedPassword;
          

          const newUser = await userModel(req.body);
          await newUser.save();
          res.status(201).send({
               success: true,
               message: "User created successfully"
          })

     }catch(error){
          console.log(error);
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}

//login callback
exports.loginController = async (req,res) => {
     try{
          const user= await userModel.findOne({email: req.body.email});
          if(!user){
               return res.status(200).send({
                    message: "User not found",
                    success: false
               })
          }

          const { email, password } = req.body;

          if (!email || !password) {
               return res.status(400).json({
                 success: false,
                 message: 'Email and password are required fields.',
               });
             }

          const isMatch = await bcrypt.compare(req.body.password, user.password);
          if(!isMatch){
               return res.status(200).send({
                    message: "Invalid email or password",
                    success: false
               })
          }

          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
               expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({
               success: true,
               message: "Login successful",
               token
          })
     }catch(error){
        console.log(error);
        res.status(500).json({
          success: false,
          message: `Error in login CTRL ${error.message}`
      })
     }
}

//forgot password
exports.forgotPasswordController=  async(req,res) => {
     try {
          const user= await userModel.findOne({email: req.body.email});
          if(!user){
               return res.status(404).send({
                    success: false,
                    message: "User not found"
               })
          }
          console.log(user);
          //get reset token
          const resetToken= await user.generatePasswordResetToken();
          console.log(resetToken);
          console.log(user.resetPasswordToken);

          //create reset password url
          // const resetUrl= `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
            const resetUrl= `${process.env.FRONTEND_URL}/password/reset/${resetToken}`


          await user.save({validateBeforeSave:false});

          const message= `Your password reset token is as follow:\n\n${resetUrl}\n\n
          if you have not requested it then ignore it.`

          try {
               await sendEmail({
                    email: user.email,
                    subject: 'BCS Password Reset',
                    message
               })
               res.status(200).send({
                    success: true,
                    message: `An email has been sent to: ${user.email}`,
                    resetToken: resetToken,
               })
               
          } catch (error) {
               user.resetPasswordToken= undefined;
               user.resetPasswordExpire= undefined;

               await user.save({validateBeforeSave: false});
               return res.status(404).send({
                    success: false,
                    message: error.message
               })
          }


     } catch (error) {
          console.log(error);
          res.status(500).json({
               success: false,
               message: error.message
          })
     }
}

//reset password
exports.resetPasswordController= async(req,res) => {
     //Hash Url token
     const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex');

     const user= await userModel.findOne({
          resetPasswordToken,
          resetPasswordExpire: {
               $gt: Date.now()
          }
     });
     if(!user){
          return res.status(400).send({
               success: false,
               message: 'Password reset token is invalid or has expired'
          })
     }
     if(req.body.password !== req.body.confirmPassword){
          return res.status(400).send({
                         success: false,
                         message: 'Passwords do not match'
                    })
     }

     const password = req.body.password;
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     req.body.password = hashedPassword;

     //Set up new password
     user.password = req.body.password;
     //destroy the token after setup
     user.resetPasswordToken= undefined;
     user.resetPasswordExpire= undefined;

     await user.save();
     res.status(200).send({
          success: true,
          message: 'Password reset successfully'
     })
}

//update password
exports.updatePasswordController= async (req,res) => {
     try {
          
          const user = await userModel.findById(req.body.userId).select('+password');
         
          const isMatched= await user.comparePassword(req.body.passwords.oldPassword);
     
          if(!isMatched) {
             res.status(400).send({
                    success: false,
                    message: 'Old password is incorrect'
               })
          }
     
          const password = req.body.passwords.newPassword;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          req.body.passwords.newPassword = hashedPassword;
     
     
          user.password= req.body.passwords.newPassword;
          await user.save();
     
          res.status(201).send({
               success: true,
               message: 'Password updated successfully'
           }) 
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Internal server error'
          })
     }
}


exports.authController= async (req,res) => {
     try{
         const user=  await userModel.findOne({_id: req.body.userId})
         user.password = undefined;
         if(!user){
          return res.status(200).send({
          message: "User not found",
          success: false
          })
         }else{
          res.status(200).send({
               success: true,
               data: user   
          })
         }
     }catch(error){
          console.log(error);
          res.status(500).json({
               success: false,
               message: 'auth error',
               error
          })
     }
}

//applyDoctor
exports.applyDoctorController= async (req,res) => {
     try {
          const newDoctor = await doctorModel({...req.body,status:'pending'});
          await newDoctor.save();
          const adminUser= await userModel.findOne({isAdmin: true});
          const notifications= adminUser.notifications
          notifications.push({
               type: 'apply-doctor-request',
               message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
               data:{
                    doctorId: newDoctor._id,
                    name: newDoctor.firstName+' '+newDoctor.lastName,
                    onClickPath: '/admin/doctors'
               }
          })
          await userModel.findByIdAndUpdate(adminUser._id,{notifications})

           res.status(201).send({
              success: true,
              message: "Doctor account applied successfully"
          })

     } catch (error) {
         console.log(error)
         res.status(500).send({
          success: false,
          error,
          message: 'Error while registering as a Doctor'
         })
    }
}

////applyDoctor
exports.applyExpertController= async (req,res) => {
     try {
          const newExpert = await expertModel({...req.body,status:'pending'});
          await newExpert.save();
          const adminUser= await userModel.findOne({isAdmin: true});
          const notifications= adminUser.notifications
          notifications.push({
               type: 'apply-expert-request',
               message: `${newExpert.firstName} ${newExpert.lastName} has applied for a ${newExpert.expertRole} account`,
               data:{
                    expertId: newExpert._id,
                    name: newExpert.firstName+' '+newExpert.lastName,
                    onClickPath: '/admin/experts'
               }
          })
          await userModel.findByIdAndUpdate(adminUser._id,{notifications})

           res.status(201).send({
              success: true,
              message: "Your Expertise account applied successfully"
          })

     } catch (error) {
         console.log(error)
         res.status(500).send({
          success: false,
          error,
          message: 'Error while registering as a Expertise'
         })
    }
}



//update user profile
exports.updatedUserProfileController= async (req,res) => {
     try {

          const updatedUser = await userModel.findOneAndUpdate(
               { _id: req.body.userId },
               req.body.values,               
               { new: true, runValidators: true }
             );
         
          res.status(201).send({
               success: true,
               message:'Profile updated successfully',
               data: updatedUser
          })
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in updating profile'
          })
     }
}

//update Profile Pic
exports.updateAvatarController= async(req,res) => {
     try {
          // Retrieve the public ID of the previous avatar from the user's data in your database
          const user = await userModel.findById(req.body.userId);
          const previousPublicId = user.avatar.public_id;

           // Delete the previous avatar image from Cloudinary
           if(previousPublicId){
               await cloudinary.v2.uploader.destroy(previousPublicId);
           }

              // Upload the new avatar image to Cloudinary
                  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                   folder: 'BCSAvatars',
                   width: 150,
                   crop: 'scale'
                 });


              const updatedUserAvatar = await userModel.findOneAndUpdate(
               { _id: req.body.userId },
               {
                 avatar: {
                   public_id: result.public_id,
                  url: result.secure_url,
                  }
               },               
               { new: true, runValidators: true }
             );
         
          res.status(201).send({
               success: true,
               message:'Avatar updated successfully',
               data: updatedUserAvatar
          })

     } catch (error) {
          console.log(error);
          res.status(500).send({
                         success: false,
                         error,
                         message: 'Error in updating avatar'
                    })
     }
}

//notificationController
exports.notificationsController =async (req,res) => {
     try {
          const user= await userModel.findOne({_id: req.body.userId})
          const seenNotifications= user.seenNotifications;
          const notifications= user.notifications;
          seenNotifications.push(...notifications)
          user.notifications= [];
          user.seenNotifications= seenNotifications;
          const updatedUser= await user.save();
          res.status(200).send({
               success: true,
               message: "All notifications mark as read",
               data: updatedUser
          })
     } catch (error) {
         console.log(error);
         res.status(500).send({
                   success: false,
                   error,
                   message: 'Error in getting notifications'
                  })
     }
}

//delete all notifications
exports.deleteNotificationsController=async (req,res) => {
     try {
          const user= await userModel.findOne({_id: req.body.userId})
          user.notifications= [];
          user.seenNotifications= [];
          const updatedUser= await user.save();
          updatedUser.password = undefined;
          res.status(200).send({
               success: true,
               message: "All notifications deleted",
               data: updatedUser
          })
     } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: 'Error in deleting notifications'
        })  
     }
}

//get all doctors
exports.getAllDoctorsController= async(req,res)=> {
     try {
          const doctors= await doctorModel.find({status: 'approved'})
          res.status(200).send({
               success: true,
               message: 'Doctors fetched successfully',
               data: doctors
          })
     } catch (error) {
         console.log(error);
         res.status(500).send({
               success: false,
               error,
               message: 'Error while fetching doctors'
          })
     }
}


//book appointment 
exports.bookAppointmentController= async (req,res) => {
     try {
          req.body.date= moment(req.body.date, 'DD-MM-YYYY').toISOString();
          req.body.time= moment(req.body.time, 'HH:mm').toISOString();
          req.body.status= "pending";
          const newAppointment = new appointmentModel(req.body);
          await newAppointment.save();
          const user= await userModel.findById({_id: req.body.doctorInfo.userId});
          console.log(newAppointment);
          user.notifications.push({
               type: 'New-Appointment-request',
               message: `A new appointment request is from ${req.body.userInfo.name}`,
               onClickPath: '/user/appointments'
          })
          await user.save();
          res.status(200).send({
               success: true,
               message: 'Appointments booked successfully',
               data: newAppointment
          })
     } catch (error) {
         console.log(error);
         res.status(500).send({
          success: false,
          error,
          message: 'Error while booking appointment'
          })
     }
}

//booking availability check
exports.bookingAvailabilityController= async (req,res) => {
     try {
          const date= moment(req.body.date, 'DD-MM-YYYY').toISOString();
          const fromTime= moment(req.body.time, 'HH:mm').subtract(1,'hours').toISOString();
          const toTime= moment(req.body.time, 'HH:mm').add(1,'hours').toISOString();
          const doctorId= req.body.doctorId;
          const appointments= await appointmentModel.find({doctorId,
               date,
               time:{
               $gte: fromTime, $lte: toTime
               }
          })
          if(appointments.length>0){
               return res.status(200).send({
                    message: "Slot not available for appointment",
                    success: true
               })
          }else{
               return res.status(200).send({
                    success: true,
                    message: 'Appointment available'
               })
          }

     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
                error,
               message: 'Error in booking'
                    })
     }
}

//get all appointments
exports.userAppointmentsController= async(req,res) => {
     try {
        const appointments= await appointmentModel.find({userId: req.body.userId}) 
     //    console.log(appointments);
        res.status(200).send({
          success: true,
          message: 'Appointments fetched successfully',
          data: appointments
        }) 
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
                message: 'Error in fetching appointments'
           })
     }
}


exports.deleteUserController= async (req,res) => {
     try {
          const users= await userModel.filter()
     } catch (error) {
          console.log(error);
     }
}
