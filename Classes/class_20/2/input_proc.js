function separateString (myString){
    var pos = myString.lastIndexOf(" ");
    var resultArray = [];

    while(pos !== -1){
        resultArray.push(myString.substr(pos));

        myString = myString.substr(0, pos);
        pos = myString.lastIndexOf(" ");
    }
    resultArray.push(myString);

    return resultArray.reverse();
}