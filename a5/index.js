/*
itc230 sp17
Assignment 5 
5//17
Ayumi Kojima
*/
'use strict'

let bigCity = require("./lib/bigCity.js");

const express = require("express");
var exphbs  = require('express-handlebars');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({ extended: true }));



//set up handlebars view engine

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');












//send static file as response
app.get('/', function(req, res){
    res.render('home'); 
})

app.get('/home', function(req, res){
    res.render('home'); 
})
// send content of 'home' view
app.get('/details', function(req,res){
 res.render('home'); 
});

app.get('/about', function(req, res){
    res.render('about');
})












// handle POST
app.post('/details', function(req,res){
    //if(!res.locals.partials)res.locals.partials = {};
    console.log(req.body)
    //var header = 'Searching for: ' + req.body.capital + '<br>';
    var result = bigCity.get(req.body.capital);
    res.render('details', {capital: req.body.capital, result: result});
    //res.locals.partials.restultContext = bigCity.get(req.body.capital);
    //next();
});

app.post('/add', function(req,res){
    console.log(req.body)
    let result = bigCity.add(req.body.capital); // add bigCity object
    if (result.added)
    {
        res.render('add', {capital: req.body.capital, result: "added" , total: result.total });
    }
    else
    {
        res.render('add', {capital: req.body.capital, result: "Already exists" , total: req.body.length});
    }
    console.log(result);
});

app.post('/delete', function(req,res){
    console.log(req.body)
    //var header = 'Searching for: ' + req.body.capital + '<br>';
    let result = bigCity.delete(req.body.capital); // delete bigCity object
    res.render('delete', {capital: req.body.capital, result: result});
    console.log(result);
});







//custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack); 
    res.status(500);
    res.send('500');
});



app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

