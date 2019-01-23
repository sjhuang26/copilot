import { ComponentState, Component } from './Component';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot';

export interface ProjectSetupState extends ComponentState {
    
}

/**
* An test view that sets up projects
*/
export class ProjectSetup implements Component {
    private parent: CopilotView;
    private element: HTMLElement;
    
    private inputBox: HTMLInputElement;
    
    constructor(parent: CopilotView, serializedState: ProjectSetupState) {
        this.parent = parent;
        
        this.element = document.createElement('div');
        if(serializedState ? serializedState.isVisible : false) {
            this.show();
        } else {
            this.hide();
        }
        
        const title = document.createElement('h2');
        title.innerText = "Setup a new project!";
        this.element.appendChild(title);
        
        const inputLabel = document.createTextNode("Project source: ");
        this.element.appendChild(inputLabel);
        
        this.inputBox = document.createElement("input");
        this.inputBox.setAttribute('type', 'text');
        this.element.appendChild(this.inputBox);
        
        const submit = document.createElement("input");
        submit.setAttribute('type', 'button');
        submit.setAttribute('value', 'Go!');

        this.loadProject = this.loadProject.bind(this);
        submit.addEventListener('click', this.loadProject);
        this.element.appendChild(submit);
    }
    
    // Returns an object that can be retrieved when package is activated
    serialize(): ProjectSetupState {
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
    
    loadProject(): void {
        const source = this.inputBox.value;
        const model = Copilot.getInstance();
        
        const callback = function(result: boolean) {
            if(result) {
                atom.notifications.addSuccess("Project successfully set up!");
            } else {
                atom.notifications.addError("Uh oh! Something went wrong while trying to set up the project.");
            }
        }
        
        model.setupProject(callback, source);
    }
}
