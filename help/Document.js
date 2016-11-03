"use strict";

var win_1 = require("../win");
function SetupFromConstructor(constructor) {
    var access = win_1.Accessor(constructor);
    var d = access.documentation = access.documentation || { "classname": constructor.name, methods: {} };
    return d;
}
function SetupFromPrototype(target) {
    if (target instanceof Function) return SetupFromConstructor(target);else return null;
}
function SetUp(t) {
    return SetupFromPrototype(t) || SetupFromConstructor(t);
}
var documentation_running = false;
function Document(info) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var target = args[0],
            key_or_num = args[1],
            descriptor = args[2];

        var d = SetUp(target);
        var key = void 0;
        switch (args.length) {
            case 1:
                DocumentClass.call(this, d, info);
                break;
            case 3:
                if (typeof args[2] === "number") {
                    key = args[3];
                    DocumentProperty.call(this, d, key, info);
                } else {
                    key = args[2];
                    DocumentMethod.call(this, d, key, info);
                }
                break;
        }
        (function (target) {
            var klass = win_1.Accessor(target).documentation;
            win_1.App().use("/can-i/document", function (req, res, next) {
                res.locals[target.name] = klass;
                next();
            });
        })(target);
    };
}
exports.Document = Document;
function DocumentClass(d, info) {
    d.class = info;
}
function DocumentMethod(d, key, info) {
    d.methods[key] = info;
}
function DocumentProperty(d, key, info) {
    d.properties[key] = info;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Document;
//# sourceMappingURL=Document.js.map