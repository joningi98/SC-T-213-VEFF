function numbers(number1, number2, number3, isIncreasingStricly){
    var increase = true;

    if (isIncreasingStricly === true){
        //  Strict increase
        if (number1 > number2 || number2 > number3){
            return false;

        }
    } else {
        if (number1 <= number2 && number2 <= number3){
            increase = false;
        }
    }
    return increase;
}