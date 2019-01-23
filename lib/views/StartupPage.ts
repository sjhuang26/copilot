import { ComponentState, Component } from './Component';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot';

export interface StartupPageState extends ComponentState {
    
}

/**
* An test view that sets up projects
*/
export class StartupPage implements Component {
    private parent: CopilotView;
    private element: HTMLElement;
    
    constructor(parent: CopilotView, serializedState: StartupPageState) {
        this.parent = parent;
        
        this.element = document.createElement('div');
        if(serializedState ? serializedState.isVisible : false) {
            this.show();
        } else {
            this.hide();
        }
        
        const title = document.createElement('h2');
        title.innerText = "Hello! I am your Copilot.";
        this.element.appendChild(title);
        
        const projectSetup = document.createElement("input");
        projectSetup.classList.add('btn');
        projectSetup.setAttribute('type', 'button');
        projectSetup.setAttribute('value', 'Setup a new Project');
        projectSetup.addEventListener('click', () => {
            parent.showProjectSetup();
        });
        this.element.appendChild(projectSetup);
    }
    
    // Returns an object that can be retrieved when package is activated
    serialize(): StartupPageState {
        return {
            isVisible: this.isVisible()
        }
    }
    
    // Tear down any state and detach
    destroy(): void {
        this.element.remove();
    }
    
    getElement(): HTMLElement {
        return this.element;
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
