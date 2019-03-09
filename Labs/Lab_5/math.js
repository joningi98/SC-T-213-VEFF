module.exports.doDivition =function (a, b){
   return a/b;
};

module.exports.stringifyDivision = function (a, b){
    let result = a/b;
    let my_str_result = a + " " +"divided by" + " " + b + " " +"is" + " " + result;
    return my_str_result.toString();
};

