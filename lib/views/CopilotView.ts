import * as Atom from 'atom';
import { ComponentState, Component } from './Component';
import { ProjectSetupState, ProjectSetup } from './ProjectSetup';
import { StartupPageState, StartupPage } from './StartupPage';

export interface CopilotViewState extends ComponentState {
    startupPageState?: StartupPageState;
    projectSetupState?: ProjectSetupState;
}

/**
* This is the rool component for the sidebar. Eventually other things
* such as resizing, title, tabs, settings, etc. will be implemented.
*/
export class CopilotView implements Component {
    private element: HTMLElement;
    
    private currentComponent: Component;
    
    private startupPage: StartupPage;
    private projectSetup: ProjectSetup;
    
    constructor(state: CopilotViewState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('copilot');
        
        if(state ? state.isVisible : false) {
            this.show();
        } else {
            this.hide();
        }
        
        // Construct components
        this.startupPage = new StartupPage(this, state ? state.startupPageState : null);
        this.element.appendChild(this.startupPage.getElement());
        
        this.projectSetup = new ProjectSetup(this, state ? state.projectSetupState : null);
        this.element.appendChild(this.projectSetup.getElement());
        
        // Keep track of which page is open
        if(this.startupPage.isVisible()) {
            this.currentComponent = this.startupPage;
        }
        if(this.projectSetup.isVisible()) {
            this.currentComponent = this.projectSetup;
        } else {
            this.showStartupPage();        
        }
    }
    
    // Returns an object that can be retrieved when package is activated
    serialize(): CopilotViewState {
        return {
            isVisible: this.isVisible(),
            projectSetupState: this.projectSetup.serialize()
        }
    }
    
    // Tear down any state and detach
    destroy(): void {
        this.projectSetup.destroy();
        this.element.remove();
    }
    
    getElement(): HTMLElement {
        return this.element;
    }
    
    showStartupPage(): void {
        if(this.currentComponent) {
            this.currentComponent.hide();
        }
        this.currentComponent = this.startupPage;
        this.currentComponent.show();
    }
    
    showProjectSetup(): void {
        if(this.currentComponent) {
            this.currentComponent.hide();
        }
        this.currentComponent = this.projectSetup;
        this.currentComponent.show();
    }
    
    isVisible(): boolean {
        return !this.element.classList.contains('hidden');
    }
    
    show(): void {
        this.element.classList.remove('hidden');
    }
    
    hide(): void {
        this.element.classList.add('hidden');
    }
}