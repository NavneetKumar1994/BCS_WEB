const doctorModel = require('../models/doctorModels')
const userModel = require('../models/userModels')
const appointmentModel = require('../models/appointmentModel')


exports.getDoctorInfoController= async (req,res) => {
     try {
          const doctor= await doctorModel.findOne({userId: req.body.userId})
          res.status(200).send({
               success: true,
               message:'Doctor details fetched successfully',
               data: doctor
          })
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in fetching doctor details'
          })
     }

}

exports.updateProfileController= async (req,res) => {
     try {
          const doctor= await doctorModel.findOneAndUpdate({userId: req.body.userId},req.body);
          res.status(201).send({
               success: true,
               message:'Profile updated successfully',
               data: doctor
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

//get single doctor
exports.getDoctorByIdController= async (req,res) => {
     try {
          const doctor= await doctorModel.findOne({_id:req.body.doctorId});
          res.status(200).send({
                success: true,
                message:'Doctor info fetched successfully',
                data: doctor
               })
               
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in fetching Doctor'
          })
     }
}

//Doctor appointment

exports.doctorAppointmentsController= async (req,res)=> {
     try{
          const doctor= await doctorModel.findOne({userId: req.body.userId});
          const appointments= await appointmentModel.find({doctorId: doctor._id});
          res.status(200).send({
                         success: true,
                         message:'Appointments fetched successfully',
                         data: appointments
                    })
     }catch(error){
          console.log(error);
          res.status(500).send({
          success: false,
          error,
           message: 'Error in Doctor appointments'
          })
     }
}


//create doctor review
exports.doctorReviewController= async (req,res) => {
     try {
          const {rating,comment,doctorId}= req.body;
          const user= await userModel.findById(req.body.userId)


          const review = {
               user,
               name: user.name,
               comment,
               rating: Number(rating)
          }

          const doctor= await doctorModel.findByIdAndUpdate(doctorId,review);


         if(doctor.userId === user._id.toString()){
          res.status(200).send({
               success: false,
               message: "You can't create your own review"
          })
         }else{
          const isReviewed = doctor.reviews.find(
               review => review.user._id.toString() === req.body.userId
             );
             if(isReviewed){
                  doctor.reviews.forEach(review =>{
                       if(review.user._id.toString()===req.body.userId){
                             review.comment=comment;
                             review.rating=rating;
                       }
                  })
             }else{
                  doctor.reviews.push(review);
                  doctor.numOfReviews= doctor.reviews.length;
             }
   
             doctor.ratings= doctor.reviews.reduce((acc,item)=> item.rating+acc,0)/doctor.reviews.length;
   
             await doctor.save({validateBeforeSave:false})
   
             res.status(201).send({
                            success: true,
                            message:'Doctor review created successfully',
                            data: doctor
                       })

          }     
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in creating doctor review'
          })
     }
}




