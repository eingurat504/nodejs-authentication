var bCrypt = require('bcrypt-nodejs');
const { check, validationResult } = require('express-validator');

module.exports = function(passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function(user, done) {
    
        done(null, user.id);
    
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
    
        User.findByPk(id).then(function(user) {
    
            if (user) {
    
                done(null, user.get());
    
            } else {
    
                done(user.errors, null);
    
            }
    
        });
    
    });

    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
     
        },

        async(req, email, password, done) => {

            var email = req.body.email;
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var password = req.body.password;

            await check('email')
                .notEmpty().isEmail()
                .withMessage('Email is required').run(req);
            await check('firstname')
                .notEmpty()
                .withMessage('First name is required').run(req);

            await check('lastname')
                .notEmpty()
                .withMessage('Last name is required').run(req);

            await check('password')
                .notEmpty()
                .withMessage('Last name is required').run(req);

            // Get validation errors (if any)
            const errors = validationResult(req);

            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
 
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
 
                if (user) {

                    return done(null, false, {
                        message: 'That email is already taken'
                    });
 
                } else {
 
                    var userPassword = generateHash(password);
                    var data = {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        };
 
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
                            return done(null, false);
                        }
 
                        if (newUser) {
                            return done(null, newUser);
                        }
 
                    });
 
                }
 
            });
 
        }
 
     
    ));


    //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
    {
  
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
  
    function(req, email, password, done) {
  
      var User = user;
  
      var isValidPassword = function(userpass,password){
        return bCrypt.compareSync(password, userpass);
      }
  
      User.findOne({ where : { email: email}}).then(function (user) {
  
        if (!user) {
          return done(null, false, { message: 'Email does not exist' });
        }
  
        if (!isValidPassword(user.password,password)) {
  
          return done(null, false, { message: 'Incorrect password.' });
  
        }
  
        var userinfo = user.get();
  
        return done(null,userinfo);
  
      }).catch(function(err){
  
        console.log("Error:",err);
  
        return done(null, false, { message: 'Something went wrong with your Signin' });
  
  
      });
  
    }
    ));
  
}