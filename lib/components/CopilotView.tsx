import * as etch from 'etch';
import { ProjectSetupProps, ProjectSetup } from './ProjectSetup';
import { StartupPageProps, StartupPage } from './StartupPage';
import { EtchComponent } from './EtchComponent';

export interface CopilotViewProps extends JSX.Props {
    hidden?: boolean;
    currentView?: string; 
}

/**
* This is the rool component for the sidebar. Eventually other things
* such as resizing, title, tabs, settings, etc. will be implemented.
*/
export class CopilotView extends EtchComponent {
    private hidden: boolean;

    private currentView: string; 
    private currentViewElement: JSX.Element;

    constructor(props: CopilotViewProps) {
        super(props);

        this.hidden = props.hidden;
        this.currentView = props.currentView || "StartupPage";
        this.currentViewElement = <p>Loading...</p>;

        etch.initialize(this);

        this.setView(this.currentView);
    }

    render(): JSX.Element {
        return (
            <div class={`copilot ${this.hidden ? "hidden" : ""}`}>
                {this.currentViewElement}
            </div>
        );
    }

    serialize(): CopilotViewProps {
        return {
            hidden: this.hidden,
            currentView: this.currentView
        }
    }

    setView(viewName: string) {
        switch(viewName) {
            case 'ProjectSetup':
                this.currentViewElement = <ProjectSetup parent={this} />
                break;
            case 'StartupPage':
                this.currentViewElement = <StartupPage parent={this} />
                break;
            default:
                throw new Error("Unknown view!");
                break;
        }
        this.currentView = viewName;
        etch.update(this);
    }
    
    isVisible(): boolean {
        return !this.hidden;
    }
    
    show(): void {
        this.hidden = false;
        etch.update(this);
    }
    
    hide(): void {
        this.hidden = true;
        etch.update(this);
    }
}