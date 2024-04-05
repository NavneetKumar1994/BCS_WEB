const express = require('express')
const authMiddleware= require('../middlewares/authMiddleware')

const {getExpertInfoController,
      updateExpertProfileController,
      getExpertByIdController}= require('../controllers/expertCtrlr')

const router= express.Router()

//get expert Info
router.post('/getExpertInfo',authMiddleware,getExpertInfoController)

//update expert profile
router.post('/updateExpertProfile',authMiddleware,updateExpertProfileController)

//get single expert
router.post('/getExpertById',authMiddleware,getExpertByIdController)

module.exports = router;