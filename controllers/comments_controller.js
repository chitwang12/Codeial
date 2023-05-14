const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
      const post = await Post.findById(req.body.post).exec();
  
      if (post) {
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        });
  
        //if the post is found now we need to attach the comment to the post from here we will do that.
        post.comments.push(comment);//this will update inside the post .
        await post.save();
  
        res.redirect('/');
      }
    } catch (err) {
      // handle error
    }
  }