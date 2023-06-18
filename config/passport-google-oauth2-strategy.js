const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID : "443989681445-ste1gfp7iid9qg7m8tqltoe6b06h61db.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
    function(accessToken,refreshToken,profile,done){
        //find a user 
        User.find({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google strategy-passport',err);
                return;
            }
            console.log(profile);

            if(user){
                //if found , set this user as req.user
                return done(null,user);
            }else{
                //if not found , create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user google strategy-passport',err);
                        return;
                    }
                })
            }
        })
    }
))

module.exports = passport;