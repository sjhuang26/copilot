
import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot'
import { EtchComponent } from './EtchComponent';
import { MarkdownRenderer } from './MarkdownRenderer';
import { File } from 'atom';

export interface InstructionsViewProps extends JSX.Props {
    markdown: string;
}

/**
* Main view for providing help to students while doing a project.
* Also provides a basic UI for testing and then fast-forwarding.
*/
export class InstructionsView extends EtchComponent {
    public readonly props: InstructionsViewProps;
    private parent: CopilotView;
    
    protected refs: {selectElm: HTMLSelectElement, markdownRenderer: any};

    public constructor(props: InstructionsViewProps) {
        super(props);
        
        this.warpTo = this.warpTo.bind(this);
        this.loadReadout = this.loadReadout.bind(this);
        this.props.markdown = "No Instructions";

        etch.initialize(this);
        this.loadReadout(0);
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
                <div class="box">
                    <h2>INSTRUCTIONS</h2>
                    <select ref="selectElm">
                        { stages.map( stage => <option value={stage.id}>Stage #{stage.id}</option> ) } 
                    </select>
                    <input type="button" class="btn" on={{click: this.warpTo}} value="Go!" />
                    <div class="section scroll">
                        <MarkdownRenderer markdown={this.props.markdown} ref="markdownRenderer" />
                    </div>
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
            this.loadReadout(stageId-1);
        });
        promise.catch((reason) => {
            atom.notifications.addError("Uh oh! Something went wrong while trying to change stages.\n" + reason.message);
        });
    }

    loadReadout(stageId: number) {
        const envManager = Copilot.getInstance().getEnvironmentManager();
        const stages = envManager.getProjectMeta().stages;
        console.log(stages);
        const instructionsFile = envManager.getProjectMetaRoot() + '/' + stages[stageId].instructions;
        console.log(instructionsFile);

        // Load the markdown file.
        this.update({markdown: "Loading..."});

        const file = new File(instructionsFile);
        file.read().then((value) => {
            console.log(value);
            this.update({markdown: value});
        }).catch((reason) => {
            atom.notifications.addError(reason);
            this.update({markdown: "Error loading markdown"});
        });
    }

    serialize(): InstructionsViewProps {
        return {
            markdown: this.props.markdown
        }
    }

    public update(props: Partial<InstructionsViewProps>, children?: JSX.Element[]): Promise<void> {
        console.log("hiweeee");
        if (this.props.markdown != props.markdown) {
            this.refs.markdownRenderer.update({markdown: this.props.markdown});
        }
        return super.update(props, children);
    }
}
