const expertModel= require('../models/expertModel');
const userModel= require('../models/userModels');


exports.getExpertInfoController = async (req,res) => {
     try {
          const expert= await expertModel.findOne({userId: req.body.userId});
          res.status(200).send({
               success: true,
               message:'Expert details fetched successfully',
               data: expert
          })
          
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in fetching expert details'
          })
     }
}

exports.updateExpertProfileController= async (req,res) => {
     try {
          const expert= await expertModel.findOneAndUpdate({userId: req.body.userId},req.body);
          res.status(201).send({
               success: true,
               message:'Profile updated successfully',
               data: expert
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

//get single expert
exports.getExpertByIdController= async (req,res) => {
     try {
          const expert= await expertModel.findOne({_id:req.body.expertId});
          res.status(200).send({
                success: true,
                message:'expert info fetched successfully',
                data: expert
               })
               
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: 'Error in fetching expert'
          })
     }
}



