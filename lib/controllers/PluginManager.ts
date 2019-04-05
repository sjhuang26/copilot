import { CompositeDisposable, Panel } from 'atom';
import { CopilotState, Copilot } from '../models/Copilot';
import { CopilotViewProps, CopilotView } from '../components/CopilotView';

export interface PluginState {
    copilotState?: CopilotState;
    copilotViewProps?: CopilotViewProps;
}

/**
 * Takes care of getting the plugin up and running, i.e. loading views
 * registering commands, etc.
 */
export class PluginManager {
    copilotView: CopilotView;
    subscriptions: CompositeDisposable;
    
    constructor() {
        
    }
    
    activate(state: PluginState) {
        state = state || {};
        state.copilotState = state.copilotState || {};
        state.copilotState.envState = state.copilotState.envState || {};

        // Set initial folder
        let curriculumRoot = atom.packages.getPackageDirPaths()[0] + '/copilot/tmp';
        state.copilotState.envState.curriculumRoot = curriculumRoot; 
        state.copilotState.envState.projectRoot = atom.project.getDirectories()[0].getPath();

        // Initialize model
        Copilot.initialize(state.copilotState);
        
        // Create sidebar
        this.copilotView = new CopilotView(state.copilotViewProps || {});
        atom.workspace.open( this.copilotView );

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();
        
        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'copilot:toggleSidebar': () => this.toggleSidebar()
        }));
    }
    
    deactivate() {
        this.subscriptions.dispose();
        this.copilotView.destroy();
    }
    
    serialize() {
        return {
            copilotState: Copilot.getInstance().serialize(),
            copilotViewProps: this.copilotView.serialize()
        };
    }
    
    toggleSidebar() {
        atom.workspace.toggle(this.copilotView); 
    }
}