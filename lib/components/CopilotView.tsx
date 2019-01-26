import * as etch from 'etch';
import { ProjectSetupProps, ProjectSetup } from './ProjectSetup';
import { StartupPageProps, StartupPage } from './StartupPage';
import { EtchComponent } from './EtchComponent';
import { Footer } from './Footer';

export interface CopilotViewProps extends JSX.Props {
    currentView?: string; 
    
    projectSetupProps?: ProjectSetupProps;
    startupPageProps?: StartupPageProps;
}

/**
 * This is the rool component for the sidebar. Eventually other things
 * such as resizing, title, tabs, settings, etc. will be implemented.
 */
export class CopilotView extends EtchComponent {
    public props: CopilotViewProps;
    
    private currentView: string; 
    
    constructor(props: CopilotViewProps) {
        super(props);
        
        // Loading personal props
        this.setView(props.currentView || "StartupPage", false);
        
        // Initialization
        etch.initialize(this);
    }
    
    getTitle(): string {
        return "Copilot";
    }
    
    getDefaultLocation(): string {
        return "right";
    }
    
    render(): JSX.Element {
        return (
            <div class="copilot">
            <div class={this.currentView == "projectsetup" ? "" : "hidden"}>
            <ProjectSetup {...this.props.projectSetupProps} parent={this} ref="projectSetup"/>
            </div>
            <div class={this.currentView == "startuppage" ? "" : "hidden"}>
            <StartupPage {...this.props.startupPageProps} parent={this} ref="startupPage"/>
            </div>
            <Footer />
            </div>
            );
        }
        
        serialize(): CopilotViewProps {
            return {
                currentView: this.currentView,
                
                projectSetupProps: this.refs.projectSetup.serialize(),
                startupPageProps: this.refs.startupPage.serialize()
            }
        }
        
        /**
        * Sets the view to the specified view.
        * @param viewName Can be one of:
        * *ProjectSetup
        * *StartupPage
        * @param updateNow Controls whether the component should update immediately to
        * reflect the changed view. True by default.
        */
        setView(viewName: string, updateNow?: boolean): void {
            this.currentView = viewName.toLowerCase(); 
            
            if(updateNow === undefined || updateNow) {
                etch.update(this);
            }
        }
    }