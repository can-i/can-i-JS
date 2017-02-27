"use strict";
var GetControllerDecoratorBuilder_1 = require("./GetControllerDecoratorBuilder");
function Get(path) {
    var builder = new GetControllerDecoratorBuilder_1.GetControllerDecoratorBuilder();
    return builder.build(path);
}
exports.Get = Get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Get;
//# sourceMappingURL=Get.js.map