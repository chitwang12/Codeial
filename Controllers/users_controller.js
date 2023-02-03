module.exports.profile = function(req,res){
  // res.end('<h1>User Profile</h1>');
    res.render('profile',{
        title : "Users Profile"
    });
}

//render the sign Up Page 
module.exports.signUp = function(req,res)
{
  return res.render('user_sign_up',{
    title : "Codeial | Sign Up"
  })
}


//render the sign In Page 
module.exports.signIn = function(req,res)
{
  return res.render('user_sign_in',{
    title : "Codeial | Sign In"
  })
}

//get the sign up data 
module.exports.create = function(req,res)
{
  //to do 
}

// sign In and create the session for the user 
module.exports.createSession = function(req,res)
{
  //to do 
}