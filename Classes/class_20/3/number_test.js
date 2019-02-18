describe("numbers(number1, number2, number3, isIncreasingStrictly", function () {
    it('should return true is number strictly increase', function () {
        var isIncreasing = numbers(2,3,10,true);
        chai.expect(isIncreasing).to.equal(true);
    });

    it('should return true is number strictly increase', function () {
        var isIncreasing = numbers(3,3,10,true);
        chai.expect(isIncreasing).to.equal(true);
    });

    it('should return true is number softly increase', function () {
        var isIncreasing = numbers(2,3,10,false);
        chai.expect(isIncreasing).to.equal(false);
    });

    it('should return true is number softly increase', function () {
        var isIncreasing = numbers(3,3,10,false);
        chai.expect(isIncreasing).to.equal(false);
    });

});