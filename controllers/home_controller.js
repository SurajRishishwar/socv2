const User = require('../models/users');
const userpost = require('../models/post');

module.exports.home = async function(req,res){

    try{
        let allpost = await userpost.find({}).populate('user')
        .sort('-createdAt')
        .populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });

        let allusers= await User.find({});
        return res.render('home',{
            title:"Sociade",
            postforhome:allpost,
            userforhome:allusers
         
        });
    }catch(err){
        console.log("Error is :",err);
    }
      
    
    //  return res.render('home',{
    //      title:"Sociade"
    //  });
}