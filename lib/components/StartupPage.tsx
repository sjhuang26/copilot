import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { EtchComponent } from './EtchComponent';

export interface StartupPageProps extends JSX.Props {
    parent?: CopilotView;
}

/**
* An test view that sets up projects
*/
export class StartupPage extends EtchComponent {
    public props: StartupPageProps;

    private parent: CopilotView;

    public constructor(props: StartupPageProps) {
        super(props);
        if(!props.parent) {
            throw new Error("Parent not defined!");
        }

        this.parent = props.parent;

        etch.initialize(this);
    }

    public render(): JSX.Element {
        return (
            <div>
                <h2>Hello! I will be your Copilot.</h2>
                <input type="button" class="btn" on={{click: () => { this.parent.setView('ProjectSetup'); } }} value="Setup a new Project"></input>
                <input type="button" class="btn" on={{click: () => { this.parent.setView('ReadoutPreview'); } }} value="Preview a markdown file"></input>
                <input type="button" class="btn" on={{click: () => { this.parent.setView('BrowseProjects'); } }} value="Browse Projects"></input>
            </div>
        );
    }

    public serialize(): StartupPageProps {
        return {};
    }
}
