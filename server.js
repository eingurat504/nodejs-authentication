// https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537

var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var path = require('path');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

 //For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true})); //session secret key
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
// require('./public');

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({ extname: '.hbs' }));
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

app.listen(5000, function(err) {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});

