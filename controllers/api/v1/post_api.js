const userpost = require('../../../models/post');
const comment = require('../../../models/comments');



module.exports.posts= async function(req,res){
    let allpost = await userpost.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path:'comment',
        populate:{
            path:'user'
        }
    });

    return res.json(allpost);
}

module.exports.delpost=async function(req,res){
    try{
        let post =await userpost.findById(req.params.id);
        //if(post.user==req.user.id){
            post.remove();
            await comment.deleteMany({post:req.params.id});

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },message:"post deleted"
            //     });
            // }
            return res.json(200,{
                message:"Deleted Successfully"
            });

        // }else{

        //     console.log("Error");
        //     return res.redirect('back');
        // }
    }catch(err){
        
        console.log("Error",err);
        return res.json(500,{
            message:"Internal Server Error"
        });

    }
   
}