// eslint practice file for ITC 230

/* -----this is the original code------
names = ['sara','joe','dave','ann']
var newArray = names.map( function(item) {
 return item.toUpperCase();
 x = 2;
}) 
console.log(newArray);

------------errors and warnings displayed---------------------------
/Users/hakone1210/SCC/itc230/hw4.js
2:1   error    'names' is not defined                    no-undef
  3:1   warning  Unexpected var, use let or const instead  no-var
  3:16  error    'names' is not defined                    no-undef
  3:27  warning  Unexpected function expression            prefer-arrow-callback
  5:2   error    Unreachable code                          no-unreachable
  5:2   error    'x' is not defined                        no-undef
  7:1   error    Unexpected console statement              no-console

✖ 7 problems (5 errors, 2 warnings)

------end of the original code ----------------------*/



let names = ['sara','joe','dave','ann']
let newArray = names.map((item) => {
 return item.toUpperCase();
// x = 2;
   
}) 

//console.log(newArray);