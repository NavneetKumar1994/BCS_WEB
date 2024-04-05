const doctorModel= require('../models/doctorModels')
const userModel= require('../models/userModels')
const expertModel= require('../models/expertModel')

exports.getAllUsersController= async (req,res) => {
     try {
          const users= await userModel.find({});
          res.status(200).send({
               success: true,
               message: 'Users Data',
               data: users
           })

     } catch (error) {
       console.log(error)
       res.status(401).send({
            message: "Error while fetching users data",
            success: false
       })   
     }
}

exports.getUserDetailsController = async (req, res) => {
     try {
          const user= await userModel.findById({_id: req.params.userId});
          res.status(200).send({
               success: true,
               message: 'User Data',
               data: user
           })

     } catch (error) {
       console.log(error)
       res.status(401).send({
            message: "Error while fetching user data",
            success: false
       })   
     }
}

exports.deleteUserController= async (req,res) => {
     try {
          const user= await userModel.findByIdAndDelete({_id: req.params.userId});
          res.status(200).send({
               success: true,
               message: 'User Deleted',
           })

     } catch (error) {
       console.log(error)
       res.status(401).send({
            message: "Error while deleting user",
            success: false
       })   
     }
}


exports.getAllDoctorsControllers=async (req,res) => {
     try {
          const doctors= await doctorModel.find({});

          res.status(200).send({
               success: true,
               message: 'Doctors Data',
               data: doctors
           })

     } catch (error) {
       console.log(error)
       res.status(401).send({
            message: "Error while fetching doctors data",
            success: false
       })   
     }
}




//doctor account status
exports.changeAccountStatusController= async (req,res) => {
     try {
          const {doctorId, status}= req.body
          const doctor= await doctorModel.findByIdAndUpdate(doctorId,{status})
          const user= await userModel.findOne({_id: doctor.userId})
          const notifications= user.notifications
          notifications.push({
               type: 'Doctor-account-request-updated',
               message:`Your Doctor account is ${status}`,
               onClickPath: '/notification'
          })
          user.isDoctor = status==='approved' ? true : false
          await user.save();
          res.status(200).send({
               success: true,
               message: "Account status updated",
               data: doctor
          })
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: "Error while changing account status"
          })
     }
}

//delete doctor

exports.deleteDoctorController= async (req,res) => {
     try {
          const doctor= await doctorModel.findByIdAndDelete({_id:req.params.doctorId});
          const user= await userModel.findOne({_id: doctor.userId})
          
          user.isDoctor= false;
          await user.save();

          // Push notification to the user
        const notifications = user?.notifications || [];
        notifications.push({
            type: 'Doctor-account-delete',
            message: 'You are no longer registered as a Doctor',
            onClickPath: '/notification',
        });

          res.status(200).send({
               success: true,
               message:'Doctor deleted successfully',
          })

          
          
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in deleting doctor'
          })
     }
}

//get all experts

exports.getAllExpertsControllers=async (req,res) => {
     try {
          const experts= await expertModel.find({});
          res.status(200).send({
               success: true,
               message: 'Experts Data',
               data: experts
           })

     } catch (error) {
       console.log(error)
       res.status(401).send({
            message: "Error while fetching doctors data",
            success: false
       })   
     }
}

//change account status of Experts
exports.changeExpertStatusController= async (req,res) => {
     try {
          const {expertId, status}= req.body
          const expert= await expertModel.findByIdAndUpdate(expertId,{status})
          const user= await userModel.findOne({_id: expert.userId})
          const notifications= user?.notifications
          notifications.push({
               type: 'Expert-account-request-updated',
               message:`Your ${expert.expertRole} account is ${status}`,
               onClickPath: '/notification'
          })
          user.isHospitalStaff = status==='approved' ? true : false
          await user.save();
          res.status(200).send({
               success: true,
               message: "Account status updated",
               data: expert
          })
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: "Error while changing account status"
          })
     }
}

//delete experts
exports.deleteExpertController= async (req,res) => {
     try {
          const expert= await expertModel.findByIdAndDelete({_id:req.params.expertId});
          const user= await userModel.findOne({_id: expert.userId})
          
          user.isHospitalStaff= false;
          await user.save();

          const notifications= user?.notifications || [];
          notifications.push({
               type: 'Doctor-account-delete',
               message:`You are no longer as a Doctor`,
               onClickPath: '/notification'
          })


          res.status(200).send({
               success: true,
               message:'Hospital staff deleted successfully',
          })

          
          
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in deleting doctor'
          })
     }
}
