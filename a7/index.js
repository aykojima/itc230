/*
itc230 sp17
Assignment 7 
6/7/17
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
    //if(bigCities.length) return;
    //console.log("insert the record");
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


// api
app.get('/api/v1/bigcity/:capital', (req, res, next) => {
    let capital = req.params.capital;
    console.log(capital);
    BigCity.findOne({capital: capital}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/bigcities', (req,res, next) => {
    BigCity.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:capital', (req,res, next) => {
    BigCity.remove({"capital":req.params.capital }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.get('/api/v1/add/:capital/:country/:population', (req,res, next) => {
    // find & update existing item, or add new 
    let capital = req.params.capital;
    BigCity.update({ capital: capital}, {capital:capital, country: req.params.country, population: req.params.population }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
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

