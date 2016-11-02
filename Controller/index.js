"use strict";
const index_1 = require('./../Config/index');
const win_1 = require("../win");
class Controller {
}
exports.Controller = Controller;
class PublicController extends Controller {
    set_up_controller(controller, req, res, next) {
        let c = controller;
        c.req = req;
        c.res = res;
        c.next = next;
    }
}
exports.PublicController = PublicController;
class BaseController extends Controller {
    constructor() {
        super();
    }
    get ConfigurationManager() {
        return index_1.ConfigurationManager;
    }
    get Server() {
        return win_1.GetServer();
    }
    get App() {
        return win_1.App();
    }
    get features() {
        return this.ConfigurationManager.feature;
    }
    get session() {
        return this.req.session;
    }
    set session(val) {
        this.req.session = val;
    }
    get body() {
        return this.req.body;
    }
    onInit() {
    }
    sendFile(...args) {
        this.res.sendFile.apply(this.res, args);
    }
    status(...args) {
        this.res.status.apply(this.res, args);
    }
    send(...args) {
        this.res.send.apply(this.res, args);
    }
}
BaseController.methods = {};
exports.BaseController = BaseController;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=index.js.map