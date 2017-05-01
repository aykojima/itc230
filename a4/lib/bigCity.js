'use strict'

let bigCities = [
    {capital: "washington,D.C.", country:"United States of America", population:"0.65 million"},
    {capital: "tokyo", country:"Japan", population:"13.62 million"},
    {capital: "rabat", country:"Morocco", population:"0.57 million"},
    {capital: "paris", country:"France", population:"2.24 million"},
    {capital: "hanoi", country:"Vietnam", population:"7.58 million"},   
];

exports.get = (capital) => {
    return bigCities.find((item) => {
        return item.capital == capital;
    });    
}

//console.log(this.get("tokyo"))

exports.delete = (capital) => {
    let oldLength = bigCities.length;
    var newCities = bigCities.filter((item) =>{
    return item.capital !== capital;    
    });
    bigCities = newCities;
    
    return { deleted: oldLength != bigCities.length, total: bigCities.length};    
}

//console.log(this.delete("Tokyo"))

exports.add = (newCapital) => {
    var found = this.get(newCapital.capital);
    if (!found) {
bigCities.push(newCapital);
        //        var newItem = [];
//        newItem = [];   
//        newItem ["capital"] = newCapital;
//            bigCities.push(newItem);        
    }
    return {added: !found, total: bigCities.length };
}

//console.log(this.add({capital: "tokyo", country:"Japan", population:"13.62 million"}))