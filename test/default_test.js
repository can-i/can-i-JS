"use strict";

var must = require("must");
describe("A Node Test", function () {
    var number = void 0;
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