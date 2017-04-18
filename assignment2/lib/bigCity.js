'use strict'

let bigCities = [
    {capital: "Washington,D.C.", country:"United States of America", population:"0.65 million"},
    {capital: "Tokyo", coutry:"Japan", population:"13.62 million"},
    {capital: "Rabat", country:"Morocco", population:"0.57 million"},
    {capital: "Paris", country:"France", population:"2.24 million"},
    {capital: "Hanoi", country:"Vietnam", population:"7.58 million"},   
];

exports.get = (capital) => {
    return bigCities.find((item) => {
        return item.capital.toLowerCase() == capital.toLowerCase();
    });    
}

//console.log(this.get("Tokyo"))

/*exports.delete = (capital) => {
    var len = bigCities.length;    
    bigCities = bigCities.filter( (item) => {
        return item.capital !== capital;
    });
    var action = (bigCities.length == len) ? "" : "deleted";
    return { "action": action, "total": bigCities.length };
}*/
exports.delete = (capital) => {
    let oldLength = bigCities.length;
    var newCities = bigCities.filter((item) =>{
    return item.capital.toLowerCase() !== capital.toLowerCase();    
    });
    bigCities = newCities;
    
    return { deleted: capital, total: bigCities.length};
    
    
}

//console.log(this.delete("Tokyo"))