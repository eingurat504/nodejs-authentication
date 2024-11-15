var exports = module.exports = {}

exports.email = function(req,res){
	res.render('./email/index'); 
}

exports.compose = function(req,res){
    res.render('./email/compose');
}

exports.send = function(req,res){

    var emailto = req.body.emailto;
    var subject = req.body.subject;
    var body = req.body.body;

    var Email = require('../models/order.js');

    var testing = Email.create();

    console.log(testing);

    // console.log(Email);

    //validation implementation
    req.checkBody('emailto', 'Email is required').notEmpty();
    req.checkBody('emailto', 'Email is not valid').isEmail();
    req.checkBody('subject', 'Subject is required').notEmpty();
    req.checkBody('body', 'Message body is required').notEmpty();

    var errors = req.validationErrors();
    
    if(errors){
        res.render('./email/compose',{
            errors:errors
        });
    }else{

        var data = {
            emailto: req.body.emailto,
            subject: req.body.subject,
            body: req.body.body
        };


            // Email.create(data).then(function(newEmail, created){
            //     if(!newEmail){
            //         // return done(null, false);
            //         console.log('failed to insert into the emails table');
            //     }
            //     if(newEmail){
            //         return done(null, newEmail);
            //     }
            // });
            
    //     req.flash('success_msg','You are registered and can now login');   
        res.redirect('/email');
    }
 
}
