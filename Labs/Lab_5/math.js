module.exports.doDivition =function (a, b){
   return a/b;
};

module.exports.stringifyDivision = function (a, b){
    let my_str_result = a + " " +"divided by" + " " + b + " " +"is" + " " + module.exports.doDivition(a,b);
    return my_str_result.toString();
};

