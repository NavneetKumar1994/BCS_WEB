const mongoose = require('mongoose');

const doctorSchema= new mongoose.Schema({
     userId:{
        type: String
     },
     userAvatar: {
      type: Object,
      ref: 'users', // Reference to the userModel
      required: true
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
    specialization:{
     type: String,
          required: [true,'specialization is required']
    },
    regNumber:{
      type: String,
      default: 'N/A'
    },
    membership:{
      type: String,
      default:'N/A'
    },
    experience:{
     type: String,
     required: [true,'experience is required']
    },
    feesPerConsultation:{
     type: Number,
     required: [true,'feesPerConsultation is required']
    },
    images:[{
            public_id: {
                type: String, 
                 required: true
             },
            url:{
                type: String, 
                required: true
             }
     }],
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
    timings:{
     type: Object,
     required: [true,'work timing is required']
    }
},
{timestamps:true}
)


const doctorModel= mongoose.model('doctors',doctorSchema);
module.exports = doctorModel;