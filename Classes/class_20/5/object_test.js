describe("radiusCalculation", function () {
    it('should return true if the point lies within the circle', function () {
        circle = {radius: 3.5, center : {x:5, y:1.2}};
        point = {a:0.1, b:0.1};

        chai.expext((radiusCalculation(circle, point)).to.equal(true))

    });

    it('should return false if the point lies not within the circle', function () {
        circle = {radius: 3.5, center : {x:5, y:1.2}};
        point = {a:2.0, b:0.0};

        chai.expext((radiusCalculation(circle, point)).to.equal(false))

    });
    it('should return false if the point is undefined', function () {
        chai.expext(radius)
    }


    });