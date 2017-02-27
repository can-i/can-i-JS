"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var NodeCreator_1 = require("../Framework/Contracts/FileSystem/Nodes/NodeCreator");
var expect = chai.expect;
describe("NodeCreator", function () {
    it("should be able to get the NodeCreator class", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                expect(NodeCreator_1.default).to.exist;
                return [2 /*return*/];
            });
        });
    });
});
//# sourceMappingURL=Framework.Contracts.FileSystem.Nodes.NodeCreator.js.map