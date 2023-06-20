const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email : req.body.email});
       console.log('Will check if actually user exists or not ',user + ' and also print the password ', user.password);
        if(!user || user.password != req.body.password ){
            return res.status(422).json({
                message : "Invalid username or password"
            });
        }
        return res.status(200).json({
            message:'Sign in succesful, here is your token !!',
            data:{
                token:jwt.sign(user.toJSON(),'codeial')
             
            }
            
        })
    }
    catch (err) {
        console.log('******************',err);
      return res.status(500,{
        message:"Internal Server Error"
      });
    }
  };
    