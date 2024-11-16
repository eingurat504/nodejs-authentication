var authController = require('../controllers/authcontroller.js');
var emailController = require('../controllers/emailcontroller.js');
var userController = require('../controllers/userController.js');
var categoryController = require('../controllers/categoryController.js');
var productController = require('../controllers/productController.js');
var orderController = require('../controllers/orderController.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/dashboard', failureRedirect: '/signup' } ));
    app.get('/dashboard', isLoggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', { successRedirect: '/dashboard', failureRedirect: '/signin' } ));
 
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    app.get('/email', isLoggedIn, emailController.email);
    app.get('/users', isLoggedIn, userController.index);
    // app.get('/products', isLoggedIn, productController.index);
    app.get('/orders', isLoggedIn, orderController.index);

    app.get('/categories', isLoggedIn, categoryController.index);
    app.get('/categories/:id/edit',isLoggedIn, categoryController.edit);
    app.get('/categories/create', isLoggedIn, categoryController.create);
    app.post('/categories/store', isLoggedIn, categoryController.store);
    app.post('/categories/:id/update', isLoggedIn, categoryController.update);
  
    app.get('/products', isLoggedIn, productController.index);
    app.get('/products/:id/edit',isLoggedIn, productController.edit);
    app.get('/products/create', isLoggedIn, productController.create);
    app.post('/products/store', isLoggedIn, productController.store);
    app.post('/products/:id/update', isLoggedIn, productController.update);
  
 
}