"use strict";
var Win_1 = require("../Win");
var index_1 = require("../Win/index");
var index_2 = require("../Event/index");
function SetupFromConstructor(constructor) {
    var access = Win_1.Accessor(constructor);
    var d = access.documentation = access.documentation || { "classname": constructor.name, methods: {} };
    return d;
}
function SetupFromPrototype(target) {
    if (target instanceof Function)
        return SetupFromConstructor(target);
    else
        return null;
}
function SetUp(t) {
    return SetupFromPrototype(t) || SetupFromConstructor(t);
}
var documentation_running = false;
function Document(info) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = args[0], key_or_num = args[1], descriptor = args[2];
        var d = SetUp(target);
        var key;
        switch (args.length) {
            case 1:
                DocumentClass.call(this, d, info);
                break;
            case 3:
                if (typeof args[2] === "number") {
                    //property
                    key = args[3];
                    DocumentProperty.call(this, d, key, info);
                }
                else {
                    //method
                    key = args[2];
                    DocumentMethod.call(this, d, key, info);
                }
                break;
        }
        (function (target) {
            var klass = Win_1.Accessor(target).documentation;
            var keep_going = function () {
                Win_1.App().use("/can-i/document", function (req, res, next) {
                    res.locals[target.name] = klass;
                    next();
                });
            };
            if (index_1.State.Ready) {
                keep_going();
            }
            else {
                index_2.default.on("can-i:bootstrapped", keep_going);
            }
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