"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PluginManager_1 = require("./controllers/PluginManager");
// This just forwards the startup code to an actual class
let pluginManager;
function activate(state) {
    pluginManager = new PluginManager_1.PluginManager();
    pluginManager.activate(state);
}
exports.activate = activate;
function deactivate() {
    pluginManager.deactivate();
}
exports.deactivate = deactivate;
function serialize() {
    return pluginManager.serialize();
}
exports.serialize = serialize;
//# sourceMappingURL=copilot.js.map