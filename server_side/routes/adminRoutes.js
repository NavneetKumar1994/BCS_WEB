const express= require('express');
const authMiddleware= require('../middlewares/authMiddleware');
const {  getAllUsersController,
      getUserDetailsController,
      deleteUserController,
      getAllDoctorsControllers,
     changeAccountStatusController,
     deleteDoctorController, 
     getAllExpertsControllers,
     changeExpertStatusController,
     deleteExpertController} = require('../controllers/adminCtrlr');

const router= express.Router();

//get users 
router.get('/getAllUsers',authMiddleware,getAllUsersController )

//get user detail
router.get('/getUserDetails/:userId',authMiddleware,getUserDetailsController)

//delete User
router.delete('/deleteUser/:userId', deleteUserController);


//get doctors
router.get('/getAllDoctors',authMiddleware,getAllDoctorsControllers)


//account status
router.post('/changeAccountStatus',authMiddleware, changeAccountStatusController)


//remove doctor
router.delete('/deleteDoctor/:doctorId',authMiddleware, deleteDoctorController);

//get experts
router.get('/getAllExperts',authMiddleware,getAllExpertsControllers)

//change expert account status
router.post('/changeExpertStatus',authMiddleware,changeExpertStatusController)

//delete expert
router.delete('/deleteExpert/:expertId',authMiddleware,deleteExpertController)

module.exports = router;