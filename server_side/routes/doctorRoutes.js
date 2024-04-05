const express = require('express');
const authMiddleware= require('../middlewares/authMiddleware');
const { getDoctorInfoController, 
         updateProfileController,
         getDoctorByIdController,
         doctorAppointmentsController,
         deleteDoctorController, 
         doctorReviewController,
          appointmentController} =require('../controllers/doctorCtrlr')


const router= express.Router();

//get Doctor Info
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//post update profile
router.post('/updateProfile',authMiddleware,updateProfileController);

//Post get single doctor
router.post('/getDoctorById',authMiddleware,getDoctorByIdController);

//Get Appointments
router.get('/doctor-appointments',authMiddleware,doctorAppointmentsController);

//create doctor review
router.put('/review',authMiddleware,doctorReviewController);



module.exports = router;