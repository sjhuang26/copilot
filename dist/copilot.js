"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const copilot_view_1 = require("./copilot-view");
const atom_1 = require("atom");
exports.default = {
    copilotView: null,
    modalPanel: null,
    subscriptions: null,
    activate(state) {
        this.copilotView = new copilot_view_1.default(state.copilotViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.copilotView.getElement(),
            visible: false
        });
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new atom_1.CompositeDisposable();
        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'copilot:toggle': () => this.toggle()
        }));
    },
    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.copilotView.destroy();
    },
    serialize() {
        return {
            copilotViewState: this.copilotView.serialize()
        };
    },
    toggle() {
        console.log('Copilot was toggled!');
        return (this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show());
    }
};
//# sourceMappingURL=copilot.js.map