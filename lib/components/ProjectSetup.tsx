import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot'
import { EtchComponent } from './EtchComponent';

export interface ProjectSetupProps extends JSX.Props {
    inputBox?: string;
}

/**
* An test view that sets up projects
*/
export class ProjectSetup extends EtchComponent {
    public props: ProjectSetupProps;
    
    private parent: CopilotView;
    
    public constructor(props: ProjectSetupProps) {
        super(props);
        
        this.loadProject = this.loadProject.bind(this);
        
        etch.initialize(this);
    }
    
    public render(): JSX.Element {
        return (
            <div>
                <h2>Setup a new project!</h2>
                Project source: <input type="text" class="input-text native-key-bindings" ref="inputbox" />
                <input type="button" class="btn" on={{click: this.loadProject}} value="Go!" />
            </div>
            );
        }
        
        serialize(): ProjectSetupProps {
            return {};
        }
        
        loadProject(): void {
            const source = this.refs.inputbox.value;
            const model = Copilot.getInstance();
            
            const promise = model.getEnvironmentManager().setupProject(source);
            promise.then(() => {
                atom.notifications.addSuccess("Project successfully set up!");
            });
            promise.catch((reason) => {
                atom.notifications.addError("Uh oh! Something went wrong while trying to set up the project.\n" + reason.message);
            });
        }
    }
    