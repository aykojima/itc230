//var credentials = require("../lib/credentials");
var mongoose = require("mongoose");

// remote db settings 
var connectionString = 'mongodb://<myURI>';
//Having trouble getting info from my credential.js that has the URI
//So, I created var connectionString here and connect to MongoDB

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
mongoose.connect(connectionString, options);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));


var bigCitySchema = mongoose.Schema({
    capital: String,
    country: String,
    population: String,
});

module.exports = mongoose.model('BigCity', bigCitySchema);