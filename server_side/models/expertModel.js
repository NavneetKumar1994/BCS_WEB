const mongoose= require('mongoose');

const expertSchema= new mongoose.Schema({
     userId:{
          type: String
       },
      firstName:{
        type: String,
        required: [true,'firsName is required']
      },
      lastName:{
       type: String,
       required: [true,'lastName is required']
      },
      phone:{
       type: String,
       required: [true,'phone is required']
      },
      email:{
       type: String,
       required: [true,'email is required']
      },
      website:{
       type: String
      },
      address:{
       type: String,
       required: [true,'address is required']
      },
      department:{
        type: String,
        required: [true,'Department is required']
       },
      expertRole:{
       type: String,
            required: [true,'specialization is required']
      },
      experience:{
          type: String,
     },
     ratings:{
          type: Number,
          defult: 0
       },
       reviews:[{
                    name: {
                      type: String,
                      required: true
                     },
                    rating:{
                      type:Number,
                      required:true
                     }, 
                    comment:{
                      type:String,
                      required: true
                     },
                    user:{
                      type: mongoose.Schema.ObjectId,
                      ref: 'userModel',
                      required: true
                     },
       }],
       numOfReviews:{
          type: Number,
          default: 0
       },
       status:{
         type: String,
         default: 'pending'
       },
})

const expertModel= mongoose.model('experts',expertSchema);
module.exports = expertModel;