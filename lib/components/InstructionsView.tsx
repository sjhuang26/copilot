
import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot'
import { EtchComponent } from './EtchComponent';

/**
* Main view for providing help to students while doing a project.
* Also provides a basic UI for testing and then fast-forwarding.
*/
export class InstructionsView extends EtchComponent {
    private parent: CopilotView;
    
    protected refs: {selectElm: HTMLSelectElement};

    public constructor(props: any) {
        super(props);
        
        this.warpTo = this.warpTo.bind(this);
        
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
                    <h2>INSTRUCTIONS</h2>
                    <select ref="selectElm">
                        { stages.map( stage => <option value={stage.id}>Stage #{stage.id}</option> ) } 
                    </select>
                    <input type="button" class="btn" on={{click: this.warpTo}} value="Go!" />
                </div>
            );
        }
    }
    
    warpTo(): void {
        const stageId = parseInt(this.refs.selectElm.value);
        const model = Copilot.getInstance();

        const promise = model.getWarpDrive().warpTo(stageId);
        promise.then(() => {
            atom.notifications.addSuccess("Successfully warped to stage " + stageId + ".");
        });
        promise.catch((reason) => {
            atom.notifications.addError("Uh oh! Something went wrong while try to change stages.\n" + reason.message);
        });
    }
}
