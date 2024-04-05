const express = require('express');
const colors = require('colors');
const multer= require('multer');
const morgan = require('morgan');
const dotenv= require('dotenv');
const connectDB = require('./configs/db');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary');


//dotenv config
dotenv.config();

//mongodb config
connectDB();

//rest object 
const app = express();


//setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));





//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Adjust the limit as needed
}));


//routes
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/admin',require('./routes/adminRoutes'))
app.use('/api/v1/doctor',require('./routes/doctorRoutes'))
app.use('/api/v1/expert',require('./routes/expertRoutes'))

//static files
app.use(express.static(path.join(__dirname, './ui_side/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './ui_side/build/index.html'));
});



const port= process.env.PORT || 8080;
//listen port
app.listen(port,()=>{
     console.log(`Server running in ${process.env.NODE_MODE} mode on port ${port}`
     .bgCyan.white)
})


// // Handle Unhandled Promise rejections
// process.on('unhandledRejection', err => {
//   console.log(`ERROR: ${err.stack}`);
//   console.log('Shutting down the server due to Unhandled Promise rejection');
//   server.close(() => {
//       process.exit(1)
//   })
// })