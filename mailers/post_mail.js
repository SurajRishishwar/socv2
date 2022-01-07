const nodeMailer= require('../config/nodemailer');




exports.newpost = (post)=>{
    console.log('inside');

    let htmlString=nodeMailer.renderTemplate({post:post},'/post/new_post.ejs');


    nodeMailer.transporter.sendMail({
        from:'sociademedia@gmail.com',
        to:post,
        subject:'New Post Published ',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('mail delivered',info);
        return;
    });
}