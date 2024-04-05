const express = require('express');
const {loginController, 
     registerController, 
     forgotPasswordController,
     authController, 
     applyDoctorController,
     applyExpertController, 
     userProfileController,
     notificationsController,
     deleteNotificationsController,
     getAllDoctorsController,
     bookAppointmentController,
     bookingAvailabilityController,
     userAppointmentsController,
     updatedUserProfileController,
     deleteUserController,
     resetPasswordController,
     updatePasswordController,
     updateAvatarController,
     getAllDoctorsAvatarController}= require('../controllers/userCtrlr')
const authMiddleware= require('../middlewares/authMiddleware')

//router object
const router = express.Router();

//routes
//login||post
router.post('/login',loginController)

//register||post
router.post('/register',registerController)

//forgot password
router.post('/password/forgot',forgotPasswordController);

//reset password
router.put('/password/reset/:token', resetPasswordController)

//update password
router.put('/password/update',authMiddleware, updatePasswordController)

//auth || post
router.post('/getUserData',authMiddleware,authController)

//applyDoctor || post
router.post('/apply-doctor',authMiddleware, applyDoctorController)

//applyExpert
router.post('/apply-expert',authMiddleware, applyExpertController)

//update user profile
router.post('/updateUserProfile',authMiddleware,updatedUserProfileController)

//update profile pic
router.post('/updateUserAvatar',authMiddleware,updateAvatarController)

//notifications || post
router.post('/get-all-notification',authMiddleware, notificationsController)

//notifications || post
router.post('/delete-all-notification',authMiddleware, deleteNotificationsController)

//get Alldoctors
router.get('/getAllDoctors',authMiddleware, getAllDoctorsController)


//book appointment || post
router.post('/book-appointment',authMiddleware, bookAppointmentController)

//bookin availability
router.post('/booking-availability',authMiddleware, bookingAvailabilityController)

//appointments list
router.get('/user-appointments',authMiddleware, userAppointmentsController)

//delete user
router.get('/deleteUser',authMiddleware, deleteUserController)




module.exports = router;