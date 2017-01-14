// This is a shell server file I copied from a previous project.  I will clean it up later.

//Dependencies
var express = require('express');
var path = require('path');
// CAN WE CHOOSE A FAVICON
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var request = require('request');
var queryString = require('querystring');
var mysql = require('mysql');
// var models = require('./models');
var port = process.env.PORT || 3000; 


// Can we separate each route into a separate controller file and require them into the server?   That would make it easier to keep the length of the code manageable.
// For example,  each controller below would control one of the routes --   AddCard, Buy, Sell, etc.

//Controllers
var mainControl = require('./controllers/mainControl.js');
var auth = require ('./controllers/auth.js');
var myAccount = require('./controllers/myAccount.js');
var sellCard = require('./controllers/sellCard.js');
var buyCard = require('./controllers/buyCard.js');
var addCard = require('./controllers/addCard.js');
var addCreditCard = require('./controllers/addCreditCard.js');


//Express settings
//=========================================//
var app = express();

app.use(methodOverride('_method'));
// do we need to set an auth cookie on this line?
// app.use(session({secret: 'spotify', cookie: {maxAge: 60000}}));
app.use(cookieParser()); 


// NEED TO STORE FAVICON  FILE HERE
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Need to revise routes below.
//Controller Routing
app.use('/', mainControl);
app.use('/signin', auth);
app.use('/myaccount', myAccount);
app.use('/sellcard', sellCard);
app.use('/buycard', buyCard);
app.use('/addcard', addCard);
app.use('/addcreditcard', addCreditCard);


//Forwards errors to the Error Handler
app.use(function(req, res, next){
	var err = new Error("Not found.");
	err.status = 404; 
	next(err); 
});

//Error Handler
app.use(function(err, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	})
})


// This is some Sequelize code.  Need to cover this with Josh for database use.
// models.sequelize.sync({force: true}).then(function(){
// 	app.listen(port, function(){
// 		console.log("Listening on port: "+port);
// 	})
// });

app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});

module.exports = app; 