// https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537

var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').config();
var exphbs = require('express-handlebars');
// var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');
var flash = require('connect-flash');
var path = require('path');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

 //For Passport
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }})); //session secret key
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//connect flash
app.use(flash());

//setting global variables for the flash messages
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        eq: function (a, b) {
            return a === b;
        }
    },
    defaultLayout: 'main', // Just 'main', not 'main.hbs'
    layoutsDir: 'app/views/layouts', // Specify the layout directory
    partialsDir: 'app/views/layouts/partials', // Add this line
  }));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});
 
//Models
var models = require('./app/models');

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync database
models.sequelize.sync().then(function(){
    console.log('Nice database looks fine');
}).catch(function(err){
    console.log(err, 'something went wrong with the database update');
});

app.listen(process.env.PORT, function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});

