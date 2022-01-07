const userpostcomment = require('../models/comments');
const userpost = require('../models/post');

module.exports.createcomment = async function(req,res){
   
   userpost.findById(req.body.post,function(err,post){
       if(post){
           userpostcomment.create({
               content:req.body.content,
               post:req.body.post,
               user:req.user._id
           },function(err,comment){
               if(err){
                req.flash('error','Comment Failed');  
               }
               post.comment.push(comment);
               post.save();
               res.redirect('/');
           });
       }
   });
    req.flash('success','comment ho gya');
} 


module.exports.destroy = function(req,res){
    userpostcomment.findById(req.params.id,function(err,comment){
        let postid= comment.post;
    
       
         userpost.findById(postid).populate('user').exec(function(err,postcreate){
             let postcreater=postcreate.user.id;
             
             if(postcreater==req.user.id){
                 comment.remove();
                
                 userpost.findByIdAndUpdate(postid,{$pull:{comment:req.params.id}},function(err,post){
                     return res.redirect('back');
                     
                 });
             }
             else if(comment.user==req.user.id){
                 
                comment.remove();

                userpost.findByIdAndUpdate(postid,{$pull:{comment:req.params.id}},function(err,post){
                    return res.redirect('back');
                });
             }
             else{
            
                return res.redirect('back');
            }
         });
         
    });
} 