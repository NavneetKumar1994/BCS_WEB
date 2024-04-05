const mongoose = require('mongoose');
const colors= require('colors');


const connectDB= async ()=>{
     try{
        //  await mongoose.connect(process.env.MONGODB_URL)
        mongoose.connect("mongodb+srv://navneet:navneet1994@cluster0.yjaktkh.mongodb.net/", {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         serverSelectionTimeoutMS: 30000, // Timeout after 30s
         socketTimeoutMS: 45000, // Socket timeout after 45s
         connectTimeoutMS: 30000 // Connect timeout after 30s
     })
        console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
     }catch(error){
         console.log(`MongoDB server issue ${error.message}`.bgRed.black);
     }
}

module.exports = connectDB;