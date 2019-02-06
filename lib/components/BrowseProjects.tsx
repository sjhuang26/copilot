import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot'
import { EtchComponent } from './EtchComponent';

export interface BrowseProjectsProps extends JSX.Props {}

/**
* An test view that sets up projects
*/
export class BrowseProjects extends EtchComponent {
    public props: BrowseProjectsProps;

    private parent: CopilotView;

    public constructor(props: BrowseProjectsProps) {
        super(props);
        etch.initialize(this);
    }

    public render(): JSX.Element {
        return (
            <div>
                <h2>Browse Projects</h2>
            </div>
        );
    }

    serialize(): BrowseProjectsProps {
        return {};
    }
}
