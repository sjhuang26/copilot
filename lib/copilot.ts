import { CopilotState, PluginManager } from './controllers/PluginManager';

// This just forwards the startup code to an actual class
let pluginManager: PluginManager;
export function activate(state: CopilotState) {
    pluginManager = new PluginManager();
    pluginManager.activate(state);
}

export function deactivate() {
    pluginManager.deactivate();
}

export function serialize() {
    return pluginManager.serialize();
}

