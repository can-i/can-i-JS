"use strict";
var express = require("express");
var root_1 = require("./root");
var ROOT = root_1.default;
function App() {
    var app = ROOT.app || (ROOT.app = express());
    return app;
}
exports.App = App;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=app.js.map