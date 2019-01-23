import * as Atom from 'atom';
import { ComponentState, Component } from './Component';
import { ProjectSetupState, ProjectSetup } from './ProjectSetup';

export interface CopilotViewState extends ComponentState {
    projectSetupState?: ProjectSetupState
}

/**
 * This is the rool component for the sidebar. Eventually other things
 * such as resizing, title, tabs, settings, etc. will be implemented.
 */
export class CopilotView implements Component {
    private element: HTMLElement;
    
    private currentComponent: Component;

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

        this.projectSetup = new ProjectSetup(this, state ? state.projectSetupState : null);
        this.element.appendChild(this.projectSetup.getElement());
        this.showProjectSetup();        
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