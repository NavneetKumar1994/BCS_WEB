// create and send token and also save in cookie

const sendToken = (user, statusCode, res) => {
     // create jwt token
     const token = user.getJwtToken();
  
     // options for the cookie
     const options = {
       expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
       ),
       httpOnly: true
     };
  
     // send the response with token and set the cookie
     res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
     });
  };
  
  module.exports = sendToken;
  