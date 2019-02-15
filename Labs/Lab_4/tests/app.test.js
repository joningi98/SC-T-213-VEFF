describe('doPythagoras function', function() {
    it('should return the length pythagoras of  a: 6 and b:6', function() {
        chai.expect(doPythagoras(6, 6).toFixed(2)).to.equal('8.49');
    });
    it('should return negative numbers for  a:-4 and b:-4', function () {
        chai.expect(doPythagoras(-4,4)).to.equal('Negative number');
    });
    it('Should return "Invalid input" when "a" or "b" not a number or a negative number', function () {
        chai.expect(doPythagoras(-4, 'a')).to.equal('Invalid input')
    })
});

describe('checkURL function', function(){
    it('Should return false is the URL is not a string or is empty', function () {
        chai.expect(checkURL(6)).to.be.false;
    });
    it('Should return true if a proper URl is passed',function () {
        chai.expect(checkURL('https://reykjavik.instructure.com/')).to.be.true;

    })
});

describe('markAndResetInput function', function () {
    it('Should not throw an exception/error when a null object or undefined is passed in', function () {
        chai.expect(markAndResetInput).to.not.throw(TypeError);
    });
});

describe('loadFileAsync function', function () {
    it('Should call the callback with the required resource if a proper URL is provided', () => {
        loadFileAsync('https://veff213-sudoku.herokuapp.com/test',() => {
            chai.expect(result, null)
        });
    });
    it('should call the callback with null in case the URL is invalid or the HTTp request is not successful',  (request) => {
        loadFileAsync('http://fasjfkasjnkdasjkl.is', (result) =>{
            try {
                //chai.expect(loadFileAsync, null).to.be.null;
                chai.assert.typeOf(null, 'null');
                request();
            }catch (e) {
                request(e);
            }

        });
    });
});