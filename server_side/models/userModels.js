const mongoose= require('mongoose');
const crypto= require('crypto');
const bcrypt= require('bcryptjs');
const validator= require('validator');

const userSchema= new mongoose.Schema({
     name: {
          type: String,
          required: [true,'name is required'],
          maxLenght: [30,'Your name can be more than 30 characters']

     },
     email: {
          type: String,
          required: [true,'email is required'],
          unique: true,
          validate: [validator.isEmail,'Please enter a valid email address'],
     },
     password: {
          type: String,
          required: [true,'password is required'],
          minLength: [6,'Your password must be at least 6 characters'],
     },
     avatar:{
          public_id: {
           type:String,
          required: true,
          default:'default.useravatar'
          },
          url: {
           type:String,
           required: true,
           default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
          },
     },
     phone:{
          type: String,
          unique: true,
          match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
          required: true     
     },
     age:{
          type: Number,
          default: 0,
          validate(value){
              if(value<0){
                  throw new Error ("invalid output");
              }
          }
       },
     address:{
          type: String,
     },
     profession:{
          type:String
     },
     experience:{
          type: String
     },
     isAdmin:{
          type: Boolean,
          default: false
     }, 
     isDoctor:{
          type: Boolean,
          default: false
     },
     isHospitalStaff:{
          type: Boolean,
          default: false
     },
     notifications:{
          type: Array,
          default: [],
     },
     seenNotifications:{
          type: Array,
          default: [],          
     },
     created_at: {
          type: Date,
          default: Date.now
         },
         resetPasswordToken: String,
         resetPasswordExpire: Date    
})




//compare user Password
userSchema.methods.comparePassword = async function(enteredPassword){

     return await bcrypt.compare(enteredPassword,this.password);   
}

//return JWT
userSchema.methods.getJwtToken =  function(){
     return jwt.sign({id: this._id},process.env.JWT_SECRET,{
         expiresIn: process.env.JWT_EXPIRES_TIME
     })
}


userSchema.methods.generatePasswordResetToken= function(){
     //generate token
     const resetToken= crypto.randomBytes(20).toString('hex');
     //Hash and set to the reset password token
     this.resetPasswordToken= crypto.createHash('sha256').update(resetToken).digest('hex');
     //Set the expire time to 1/2 hour
     this.resetPasswordExpire= Date.now() + 30 * 60 * 1000;

     return resetToken
}


const userModel= mongoose.model('users',userSchema);
module.exports= userModel;

