import CopilotView from './views/Sidebar';
import { CompositeDisposable } from 'atom';

export default {

  copilotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state: any) {
    this.copilotView = new CopilotView(state.copilotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.copilotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'copilot:toggleSidebar': () => this.toggle()
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

  toggleSidebar() {
    console.log('Copilot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
