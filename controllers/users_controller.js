const User = require('../models/users');


module.exports.profile = async function(req,res){
    try {
        if(req.cookies.user_id){
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                });
            }
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log('Error in finding user in profile:', err);
        return res.redirect('/users/sign-in');
    }
}


//render the sign up page 
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
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
module.exports.createSession = async function(req, res) {
    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });
        
        // handle User not found
        if (!user) {
            return res.redirect('back');
        }

        // handle mismatching passwords
        if (user.password !== req.body.password) {
            return res.redirect('back');
        }

        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    } catch (err) {
        console.log('Error in finding user in signing In', err);
        return;
    }
};
