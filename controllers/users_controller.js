const User = require('../models/users');
const fs = require('fs');
const path = require('path');
module.exports.profile = async function(req,res){
    const user = await User.findById(req.params.id);
        return res.render('user_profile',{
            title:'User Profile',
            profile_user : user
        });
};

module.exports.update = async function(req,res){
    try{
    if(req.params.id == req.user.id){
       const user = await User.findByIdAndUpdate(req.params.id,req.body);
       User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('***** Multer Error',err)
            }
            user.name = req.body.name;
            user.email = req.body.email;
           if(req.file){

            if(user.avatar){
                fs.unlinkSync(path.join(__dirname,'..',user.avatar))
            }
            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar = User.avatarPath + '/' + req.file.filename;
           }
           user.save();
       });
       req.flash('success','You Records are updated successfully!!')
       return res.redirect('back');
        }else {
        
        return res.status(401).send('Unauthorized !!!');
    }
}catch(err){
    req.flash('error',err);
    console.log('Error in updating the user : ',err);
    return res.redirect('back');
}
}

//render the sign up page 
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        req.flash('success','Signed in Successfully!!');
       return res.redirect('/users/profile');
    }
    req.flash('error',"Error Signing in ");
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in creating user while signing up', err);
        return res.redirect('back');
    }
}

   

//Sign in and create a session for the user 
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
   return res.redirect('/');
}

//to destroy the session we use this
module.exports.destroySession = async function (req, res) {
    try {
      await new Promise((resolve, reject) => {
        req.logout((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      req.flash('success', 'Logged out successfully');
  
      return res.redirect('/');
    } catch (err) {
      console.log('Error in logging out!!', err);
      return res.redirect('/');
    }
  };
  

