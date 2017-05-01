var expect = require("chai").expect;
var bigCity = require("../lib/bigCity");

//module test for get method--------------------
describe("bigCity module", () => {
 it("get returns requested city", function() {
   var result = bigCity.get("tokyo");
   expect(result).to.deep.equal({capital: "tokyo", country:"Japan", population:"13.62 million"});
 });
 
 it("get fails w/ invalid city", () => {
   var result = bigCity.get("fake");
   expect(result).to.be.undefined;
 });
});
//-------------------------------------------------


//module test for delete method--------------------
describe("bigCity module", () => {
 it("delete deletes requested city", function() {
   var result = bigCity.delete("tokyo");
   expect(result.deleted).to.be.true;
  });
 it("delete fails w/ invalid city", () => {
   var result = bigCity.delete("fake");
   expect(result.deleted).to.be.false;
 });
});

//-------------------------------------------------


//module test for add method--------------------
describe("bigCity module", () => {
 it("add adds requested city", function() {
   var result = bigCity.add({capital: "cairo", country:"Japan", population:"13.62 million"});
   expect(result.added).to.be.true;
 });
 
 it("add fails w/ existing city", () => {
   var result = bigCity.add({capital: "cairo", country:"Japan", population:"13.62 million"});
   //console.log(result);
     expect(result.added).to.be.false;
 });
});

//-------------------------------------------------

/*
search - ok
delete - seoul -> deleted/ remaining 5
       - tokyo -> deleted/ remaining 4
(after delete, tokyo is not found in search)
add - hanoi -> hanoi already exist
    - tokyo -> tokyo already exist
    - seoul - > already exist
*/



