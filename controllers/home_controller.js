const Post = require('../models/post');

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
   const posts = await Post.find({}).populate('user').exec();
   return res.render('home', {
     title: 'Codeial | Home',
     posts: posts,
   });
 } catch (err) {
   console.log('Error in fetching posts from database', err);
   return res.redirect('back');
 }
}
