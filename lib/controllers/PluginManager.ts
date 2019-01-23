import { CompositeDisposable, Panel } from 'atom';
import { Copilot } from '../models/Copilot';
import { CopilotViewState, CopilotView } from '../views/CopilotView';

export interface CopilotState {
    copilotViewState: CopilotViewState;
}

/**
 * Takes care of getting the plugin up and running, i.e. loading views
 * registering commands, etc.
 */
export class PluginManager {
    copilotView: CopilotView;
    panel: Panel<HTMLElement>;
    subscriptions: CompositeDisposable;
    
    constructor() {
        
    }
    
    activate(state: CopilotState) {
        // Initialize model
        Copilot.initialize();
        
        // Create sidebar
        this.copilotView = new CopilotView(state ? state.copilotViewState : null);
        this.panel = atom.workspace.addRightPanel({
            item: this.copilotView.getElement(),
            visible: true
        });

        
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();
        
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
        if(this.copilotView.isVisible()) {
            this.copilotView.hide();
        } else {
            this.copilotView.show();
        }
    }
}