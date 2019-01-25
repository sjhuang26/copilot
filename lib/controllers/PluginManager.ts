import { CompositeDisposable, Panel } from 'atom';
import { Copilot } from '../models/Copilot';
import { CopilotViewProps, CopilotView } from '../components/CopilotView';

export interface CopilotState {
    copilotViewProps: CopilotViewProps
}

/**
 * Takes care of getting the plugin up and running, i.e. loading views
 * registering commands, etc.
 */
export class PluginManager {
    copilotView: CopilotView;
    panel: Panel<CopilotView>;
    subscriptions: CompositeDisposable;
    
    constructor() {
        
    }
    
    activate(state: CopilotState) {
        // Initialize model
        Copilot.initialize();
        
        // Create sidebar
        // this.copilotView = new CopilotView(state ? state.copilotViewState : null);
        this.copilotView = new CopilotView(state ? state.copilotViewProps : {});
        this.panel = atom.workspace.addRightPanel({
            item: this.copilotView,
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
            copilotViewProps: this.copilotView.serialize()
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