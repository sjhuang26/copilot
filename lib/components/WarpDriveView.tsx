
import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot'
import { EtchComponent } from './EtchComponent';

/**
* An test view that sets up projects
*/
export class WarpDriveView extends EtchComponent {
    private parent: CopilotView;
    
    public constructor(props: any) {
        super(props);
        
        this.loadProject = this.loadProject.bind(this);
        
        etch.initialize(this);
    }
    
    public render(): JSX.Element {
        let stages = Copilot.getInstance().getEnvironmentManager().getProjectMeta().stages;
        if(stages == null) {
            return (
                <div>
                    stages.json does not exist in project root!
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Warp to a stage!</h2>
                    <select>
                        {stages.map((stage)=>{ <options value={stage.id}>Stage #{stage.id}</options> })}
                    </select>
                </div>
            );
        }
    }
    
    loadProject(): void {
        const source = this.refs.inputbox.value;
        const model = Copilot.getInstance();
        
        const promise = model.getEnvironmentManager().setupProject(source);
        promise.then(() => {
            atom.notifications.addSuccess("Project successfully set up!");
        });
        promise.catch((reason) => {
            atom.notifications.addError("Uh oh! Something went wrong while trying to set up the project.");
            atom.notifications.addError(reason.message);
        })
    }
}
