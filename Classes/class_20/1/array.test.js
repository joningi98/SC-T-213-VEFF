describe("reverseArray", function () {
    it('should reverse a non-empty array', function () {
        var myArray = [1,2,3,4];
        var revArray = reverseArray(myArray);
        chai.expect(myArray[0]).to.equal(revArray[3]);
        chai.expect(myArray[1]).to.equal(revArray[2]);
        chai.expect(myArray[2]).to.equal(revArray[1]);
        chai.expect(myArray[3]).to.equal(revArray[0]);

    });
});

describe("reverseArray", function () {
    it('should return null when input is null', function () {
        var myArray = 1;
        var revArray = reverseArray(myArray);
        chai.expect(null).to.equal(revArray[3]);

    });
});
