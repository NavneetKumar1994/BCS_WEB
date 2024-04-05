const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
     try {
          const token = req.headers['authorization'].split(' ')[1];
          if (token) {
             JWT.verify(token, process.env.JWT_SECRET,(err,decode)=> {
                if(err){
                    return res.status(200).send({
                         success: false,
                         message: "Authentication failed"
                    })
                }else{
                     req.body.userId = decode.id;
                     next();
                }
             });
          } else {
               res.redirect('/login');
          }
     } catch (error) {
          console.log(error)
          res.status(401).send({
               message: "Authentication failed",
               success: false
          })
     }
}