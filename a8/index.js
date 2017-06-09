'use strict'

let express = require("express");
let bodyParser = require("body-parser");
let BigCity = require("./models/bigCity"); // use database model

let app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err);
});

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

BigCity.find(function(err, bigCities){
    if(err) return console.error(err);
    if(bigCities.length) return;
    
    new BigCity({capital: "washington, D.C.", country:"United States of America", population:"0.65 million"}).save();
    new BigCity({capital: "tokyo", country:"Japan", population:"13.62 million"}).save();
    new BigCity({capital: "rabat", country:"Morocco", population:"0.57 million"}).save();
    new BigCity({capital: "hanoi", country:"Vietnam", population:"7.58 million"}).save(); 
});


app.get('/', (req,res) => {
    BigCity.find((err,bigCities) => {
        if (err) return next(err);
        res.render('home', {bigCities: JSON.stringify(bigCities)});    
    })
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

// api's
app.get('/api/v1/bigCity/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    BigCity.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/bigCities', (req,res, next) => {
    BigCity.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:id', (req,res, next) => {
    BigCity.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let bigCity = new BigCity({title:req.body.title,author:req.body.author,pubdate:req.body.pubdate});
        bigCity.save((err,newBigCity) => {
            if (err) return next(err);
            console.log(newBigCity)
            res.json({updated: 0, _id: newBigCity._id});
        });
    } else { // update existing document
        BigCity.updateOne({ _id: req.body._id}, {title:req.body.title, author: req.body.author, pubdate: req.body.pubdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/v1/add/:title/:author/:pubdate', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    BigCity.update({ title: title}, {title:title, author: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});