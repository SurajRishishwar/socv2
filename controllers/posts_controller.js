const userpost = require('../models/post');
const comment = require('../models/comments');
const postmailer = require('../mailers/post_mail')
module.exports.createpost = async function(req,res){
    try{
        let post = await userpost.create({
            content:req.body.content,
            user: req.user._id
        });
        
       

        if (req.xhr){
            post = await userpost.findById(post.id).populate('user', 'name').exec();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        
        postt=req.user.email;
        postmailer.newpost(postt);
        req.flash('success','hnnn.... ye krlo pehle');
        return res.redirect('back');
    }catch(err){
        console.log('Error in posting',err);return;
    }

    
    
} 

module.exports.destroy=async function(req,res){
    try{
        let post =await userpost.findById(req.params.id);
        if(post.user==req.user.id){
             post.remove();
             await comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },message:"post deleted"
                });
            }
            return res.redirect('back');

        }else{

            console.log("Error");
            return res.redirect('back');
        }
    }catch(err){
        
        console.log("Error",err);
        return res.redirect('back');

    }
   
}