"use strict";
const win_1 = require("../win");
function Features() {
    return ["documentation"];
}
exports.Features = Features;
function Configure(options = {}) {
    let features = options.features || [];
    for (let f of features) {
        exports.ConfigurationManager.feature.enable(f);
    }
}
exports.Configure = Configure;
class AppGetter {
    get app() {
        return win_1.App();
    }
}
exports.AppGetter = AppGetter;
class Feature extends AppGetter {
    constructor() {
        super();
    }
    convert(f) {
        return `can-i feature ${f}`;
    }
    enable(f) {
        return this.app.enable(this.convert(f));
    }
    enabled(f) {
        return this.app.enabled(this.convert(f));
    }
    disable(f) {
        return this.app.disable(this.convert(f));
    }
    disabled(f) {
        return this.app.disabled(this.convert(f));
    }
}
class _ConfigurationManager extends AppGetter {
    constructor() {
        super();
        this.feature = new Feature();
    }
}
exports.ConfigurationManager = new _ConfigurationManager();
//# sourceMappingURL=index.js.map