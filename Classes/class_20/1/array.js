function reverseArray(array){
    //[1,2,3,4]
    //return array.reverse();
    var revArray = [];
    for (var i=0; i<=array.length;i++) {
        revArray.push(array[array.length-1-i]);
    }
    console.log(array);
    console.log(revArray);
    return revArray;
}

