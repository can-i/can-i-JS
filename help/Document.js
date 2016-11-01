"use strict";
const win_1 = require("../win");
function SetupFromConstructor(constructor) {
    let access = win_1.Accessor(constructor);
    let d = access.documentation = access.documentation || { "classname": constructor.name, methods: {} };
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
let documentation_running = false;
function Document(info) {
    return function (...args) {
        let [target, key_or_num, descriptor] = args;
        const d = SetUp(target);
        let key;
        switch (args.length) {
            case 1:
                DocumentClass.call(this, d, info);
                break;
            case 3:
                if (typeof args[2] === "number") {
                    key = args[3];
                    DocumentProperty.call(this, d, key, info);
                }
                else {
                    key = args[2];
                    DocumentMethod.call(this, d, key, info);
                }
                break;
        }
        (function (target) {
            let klass = win_1.Accessor(target).documentation;
            win_1.App().use(`/can-i/document`, function (req, res, next) {
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