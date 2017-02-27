"use strict";
var tslib_1 = require("tslib");
require("source-map-support/register");
var indexBuilder_1 = require("../Framework/DevTools/Builders/LayoutBuilders/indexBuilder");
var path = require("path");
var ur = require("unhandled-rejection");
var handler = ur();
handler.on("unhandledRejection", function (err) {
    throw err;
});
Run();
function Run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var filepath, index;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filepath = path.resolve(__dirname, "../Framework");
                    index = new indexBuilder_1.IndexBuilder(filepath);
                    return [4 /*yield*/, index.build()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=indexbuilder.js.map