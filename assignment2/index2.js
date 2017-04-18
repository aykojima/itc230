/*
itc230 sp17
Assignme
nt 1 
4/7/17
Ayumi Kojima
*/
'use strict'

var http = require("http"), fs = require('fs'), qs = require("querystring");
let bigCity = require("./lib/bigCity.js");

function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            res.writeHead(500, { 'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        }else {
            res.writeHead(responseCode, { 'Content-Type': contentType});
            res.end(data);
        }
    });
}

//http.createServer(function(req,res){
http.createServer((req,res) => {
  let url = req.url.split("?");  
  let params = qs.parse(url[1]);
  let params2 = qs.parse(url[2]);
  let params3 = qs.parse(url[3]);
  let path = url[0].toLowerCase();
    switch(path){
        case '/':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/get':
            let found = bigCity.get(params.capital); // get book object
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found): "Not found";
            res.end('Results for ' + params.capital + "\n" + results); 
            break;
        case '/delete':
            let deleted = bigCity.delete(params.capital);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let resultsD = (deleted) ? JSON.stringify(deleted): "Not found";
            res.end(params.capital + ' removed. ' + resultsD);
            break;
        case '/add':
            //let added = bigCity.add(params.capital, params2.country, params3.population);
            let added = bigCity.add(params.capital);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let resultsA = (added) ? JSON.stringify(added): "Not found";
            res.end(resultsA);
            break;
        default:
            serveStaticFile(res, '/public/404.html','text/html', 404);
            break;
        }
//}).listen(3000);
}).listen(process.env.PORT || 3000);
console.log('server up!');



/*
----------This is from class-------------------------

http.createServer(function(req,res)
{
    console.log("url = " + req.url)
    res.writeHead(200,{'Content-Type': 'text/plain'});
    var path = req.url.toLowerCase()
    switch(path){
        case '/':
            fs.readFile(__public + 'home.html', function(err, data){
                res.writeHead(200,{'Content-Type':'text/plain'});          
            res.end('Home page');
                });
            break;
        case '/about':
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('About page');
            break;
        default:
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.end('Not found');
            break;
    }
    if (req.url == "/help"){
    res.end('Do you need help?');
        }else {res.end('Home page');}
    }).listen(process.env.PORT ||3000, function(){
    console.log('server up!')
});
*/