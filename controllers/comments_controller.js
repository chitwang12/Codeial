const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
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
        
        comment = await comment.populate('user','name email').execPopulate();
        commentsMailer.newComment(comment);

        if(req.xhr){
          return res.status(200).json({
            data : {
              comment : comment
            },
            message : "Post Created!!"
          });
        }
        req.flash('success','Comment published!!');
        res.redirect('/');
      }
    } catch (err) {
      // handle error
    }
  }

  module.exports.destroy = async function(req,res){
    try{
      const comment = await Comment.findById(req.params.id);

      if(comment.user == req.user.id){
        let postId = comment.post ;
       await comment.deleteOne();
       await Post.findByIdAndUpdate(postId,{$pull :{comments:req.params.id}});
          return res.redirect('back');
        }
        else{
        return res.redirect('back');
      }
    }
    catch(err)
    {
      console.log('Error in deleting Comment : ',err);
      return res.redirect('back');
    }
  };