/*
itc230 sp17
Assignment 3 
4/21/17
Ayumi Kojima
*/
'use strict'

let bigCity = require("./lib/bigCity.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(require('body-parser').urlencoded({ extended: true }));


//set up handlebars view engine
var handlebars = require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

//send static file as response
app.get('/', function(req, res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
})


// handle GET 
app.post('/delete', function(req,res){
    console.log(req.body)
    //var header = 'Searching for: ' + req.body.capital + '<br>';
    let result = bigCity.delete(req.body.capital); // delete bigCity object
    res.render('delete', {capital: req.body.capital, result: result});
});


/*
exports.delete = (capital) => {
    let oldLength = bigCities.length;
    var newCities = bigCities.filter((item) =>{
    return item.capital !== capital;    
    });
    bigCities = newCities;
    
    return { deleted: capital, total: bigCities.length};    
}

//delete.html
{{#if result}}
    <h2>{{capital}} deleted</h2>
    remaining total: {{result.total}}
{{else}}
    <h2>{{capital}} not found</h2>
{{/if}}

*/
// handle POST
app.post('/get', function(req,res){
    console.log(req.body)
    var header = 'Searching for: ' + req.body.capital + '<br>';
    var found = bigCity.get(req.body.capital);
    res.render('details', {capital: req.body.capital, result: found});
});


// handle POST
app.post('/add', function(req,res){
    console.log(req.body)
    let added = bigCity.add(req.body.capital); // add bigCity object
    if (added){
    res.render('add', {capital: req.body.capital, result: "added" , total: req.body.length});
    }
    else     
    res.render('add', {capital: "", result: "sorry about this" , total: req.body.length});

});



// send content of 'home' view
app.get('/get', function(req,res){
 let result = bigCities.get(req.query.capital);
 res.render('details', {capital: "tokyo", result: result });
});






app.get('/about', function(req, res){
    res.type('text/html');
    res.send('About page');
})
//custom 404 page
app.use(function(req, res){
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain'); 
    res.status(500);
    res.send('500 ');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

