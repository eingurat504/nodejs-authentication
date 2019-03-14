var authController = require('../controllers/authcontroller.js');
var emailController = require('../controllers/emailcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signup'
    }
 
    ));

    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signin'
        }
 
    ));
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }

    app.get('/email', isLoggedIn, emailController.email);
    
    app.get('/compose', isLoggedIn, emailController.compose);
    app.post('/compose', isLoggedIn, emailController.send);
 
 
}