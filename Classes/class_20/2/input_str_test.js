describe("separateString", function () {
    it('should separate a nono-empty string into a array', function () {
        var myString = "This is an example of a string.";
        var output = separateString(myString);
        var comparison = ["This", "is", "an", "example", "of", "a", "string."];
        chai.expect(output).to.deep.equal(comparison);

        chai.expect(output[0]).to.equal("This");
        chai.expect(output[0]).to.equal("is");
        chai.expect(output[0]).to.equal("an");
        chai.expect(output[0]).to.equal("example");
        chai.expect(output[0]).to.equal("of");
        chai.expect(output[0]).to.equal("a");
        chai.expect(output[0]).to.equal("string.");


    });

})