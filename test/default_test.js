var must = require("must");
xdescribe("A Node Test", function () {
    var number;
    before(function () {
        number = 1;
    });
    beforeEach(function () {
        number++;
    });
    it("Should add 1 to number", function () {
        must(number).to.equal(2);
    });
});
//# sourceMappingURL=default_test.js.map