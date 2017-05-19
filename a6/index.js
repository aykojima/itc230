/*
itc230 sp17
Assignment 6 
5/19/17
Ayumi Kojima
*/
'use strict'

const express = require("express");
const app = express();
var BigCity = require("./models/bigCity"); // use database model

//configure express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({ extended: true }));


//set up handlebars view engine
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//database connection

//var credentials = require("./lib/credentials");
//var mongoose = require('mongoose');
//var opts = {
//    server: {
//        socketOptions: {keepAlive: 1}
//    }
//};

//switch(app.get('env')){
//    case 'development':
//        mongoose.connect(credentials.mongo.development.connectionString, opts);
//        break;
//    case 'production':
//        mongoose.connect(credentials.mongo.production.connectionString, opts);
//        break;
//    default:
//        throw new Error('Unknown execution environment: ' + app.get('env'));
//};



BigCity.find(function(err, bigCities){
    if(err) return console.error(err);
    if(bigCities.length) return;
    
    new BigCity({capital: "washington, D.C.", country:"United States of America", population:"0.65 million"}).save();
    new BigCity({capital: "tokyo", country:"Japan", population:"13.62 million"}).save();
    new BigCity({capital: "rabat", country:"Morocco", population:"0.57 million"}).save();
    new BigCity({capital: "hanoi", country:"Vietnam", population:"7.58 million"}).save(); 
});


//send static file as response
app.get('/', function(req, res){
    res.render('home'); 
});

app.get('/home', function(req, res){
    res.render('home'); 
});

// send content of 'home' view
app.get('/details', function(req,res){
 res.render('home'); 
});

app.get('/about', function(req, res){
    res.render('about');
});



// handle POST
app.post('/details', (req,res) => {
    BigCity.findOne({ capital:req.body.capital }, (err, bigCity) => {
        if (err) {return next(err);}
        else{
            console.log(bigCity);
            res.render('details', {capital: req.body.capital, result: bigCity} ); }
    });
    
});



app.post("/delete", (req, res) => {
	BigCity.remove({capital:req.body.capital}, (err, bigCity) => {
		if (err)
			return next(err);                                  
		BigCity.count({},(err,count)=>{
        //console.log(count);
        if(err) return next(err);
        if(count==0){ 
            res.render('delete', {capital:req.body.capital, result: 'zero'});   
        }else{
            res.render('delete', {capital:req.body.capital, result: count});
        } 	
	   });	
    });    
});



//404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//500 page
app.use(function(err, req, res, next){
    console.error(err.stack); 
    res.status(500);
    res.send('500');
});



app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

