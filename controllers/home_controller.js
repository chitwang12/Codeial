const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = async function(req,res){
//    try {
//       const posts = await Post.find({});
//       return res.render('home', {
//          title: "Codieal | Home",
//          posts: posts
//       });
//    } catch (err) {
//       console.log('Error in fetching posts from database', err);
//       return;
//    }
// }

//Doing this because we automatically populating the user while working in posts db 
try {
  //populate the user of each post
   let posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path : 'comments',
      populate :{
            path : 'user'
      }
   });

  let users = await User.find({});

      return res.render('home', {
      title: 'Codeial | Home',
      posts: posts,
      all_users : users
    });
   }
 catch (err) {
   console.log('Error in fetching posts from database', err);
   return res.redirect('back');
 }
};
