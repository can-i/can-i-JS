"use strict";
var unhandledRejection = require("unhandled-rejection");
var rejectionEmitter = unhandledRejection({
    timeout: 20
});
rejectionEmitter.on("unhandledRejection", function (error, promise) {
    console.error(error.stack);
    process.exit();
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = null;
//# sourceMappingURL=UnhandledRejectionCrasher.js.map