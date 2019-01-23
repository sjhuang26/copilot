"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const Copilot_1 = require("../models/Copilot");
const CopilotView_1 = require("../views/CopilotView");
/**
 * Takes care of getting the plugin up and running, i.e. loading views
 * registering commands, etc.
 */
class PluginManager {
    constructor() {
    }
    activate(state) {
        // Initialize model
        Copilot_1.Copilot.initialize();
        // Create sidebar
        this.copilotView = new CopilotView_1.CopilotView(state ? state.copilotViewState : null);
        this.panel = atom.workspace.addRightPanel({
            item: this.copilotView.getElement(),
            visible: true
        });
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new atom_1.CompositeDisposable();
        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'copilot:toggleSidebar': () => this.toggleSidebar()
        }));
    }
    deactivate() {
        this.panel.destroy();
        this.subscriptions.dispose();
        this.copilotView.destroy();
    }
    serialize() {
        return {
            copilotViewState: this.copilotView.serialize()
        };
    }
    toggleSidebar() {
        if (this.copilotView.isVisible()) {
            this.copilotView.hide();
        }
        else {
            this.copilotView.show();
        }
    }
}
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map