var credentials = require("../lib/credentials");
//console.log(credentials);

var connectionString = credentials.development.connectionString;
//console.log(connectionString);

var mongoose = require("mongoose");

// remote db settings 
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