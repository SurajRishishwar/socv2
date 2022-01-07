const User = require('../models/users');
const userpost = require('../models/post');

const { post } = require('../routes/users');

//profile display
module.exports.uprofile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('userprofile',{
                     title:"Profile | Sociade",
                     profileuser:user
                    
                 });
    });     
  
}

module.exports.update= async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log(err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    user.avatar = User.AVATAR_PATH+'/'+req.file.filename;

                }
                user.save();
                return res.redirect('back');
                
            })
        }catch(err){
            console.log(err);
            return res.redirect('back');
        }

        // User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        //     return res.redirect('back');
        // });
    }
}

module.exports.profilepost=function(req,res){
    userpost.find({},function(err,allpost){
        if(err){
            console.log('Error in Fetching Contact from DB');
            return;
        }
        
        return res.json(allpost);
        
    });
}
module.exports.profileofuser=function(req,res){
    const id=req.params.userid;
    userpost.find({user:id},function(err,mypost){
        if(err){
            console.log('Error in Fetching Contact from DB');
            return;
        }
        
        return res.json(mypost);
        

    });

}
module.exports.userpost = function(req,res){
    return res.end('<h1>Post Page</h1>');
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('sign_in',{
        title:"Sociade | Sign-In"
    });
}
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
     }
    return res.render('sign_up',{
        title:"Sociade | Sign up"
    });
}



//sign up
module.exports.createuser = function(req,res){
    if(req.body.password != req.body.confirmpassword){
        req.flash('error','Km se Km password to shi daal');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in sign up');return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in create new user');return;}
                else{
                    req.flash('success','hogya....tera hoga');
                    return res.redirect('/users/sign-in');;
                }
            });
        }
        else{ 
            req.flash('error','tu farzi h re nikl yha se');
            return res.redirect('back');
        }
    });
}


//sign in
module.exports.createsession = function(req,res){
    req.flash('success','aagya timepasskrne');
    return res.redirect('/');
}

module.exports.signout = function(req,res){
    req.logout();
    req.flash('success','Ja na Bhai Ja');
    return res.redirect('/');
}

