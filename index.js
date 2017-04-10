/*
itc230 sp17
Assignment 1 
4/7/17
Ayumi Kojima
*/

var http = require("http"), fs = require("fs")

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

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        default:
            serveStaticFile(res, '/public/404.html','text/html', 404);
            break;
    }
}).listen(3000);
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