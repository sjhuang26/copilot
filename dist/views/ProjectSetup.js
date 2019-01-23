"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Copilot_1 = require("../models/Copilot");
/**
* An test view that sets up projects
*/
class ProjectSetup {
    constructor(parent, serializedState) {
        this.parent = parent;
        this.element = document.createElement('div');
        if (serializedState ? serializedState.isVisible : false) {
            this.show();
        }
        else {
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
        const home = document.createElement("input");
        home.setAttribute('type', 'button');
        home.setAttribute('value', 'Back');
        home.addEventListener('click', () => {
            parent.showStartupPage();
        });
        this.element.appendChild(home);
    }
    // Returns an object that can be retrieved when package is activated
    serialize() {
        return {
            isVisible: this.isVisible()
        };
    }
    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }
    getElement() {
        return this.element;
    }
    isVisible() {
        return !this.element.classList.contains('hidden');
    }
    show() {
        this.element.classList.remove('hidden');
    }
    hide() {
        this.element.classList.add('hidden');
    }
    loadProject() {
        const source = this.inputBox.value;
        const model = Copilot_1.Copilot.getInstance();
        const callback = function (result) {
            if (result) {
                atom.notifications.addSuccess("Project successfully set up!");
            }
            else {
                atom.notifications.addError("Uh oh! Something went wrong while trying to set up the project.");
            }
        };
        model.setupProject(callback, source);
    }
}
exports.ProjectSetup = ProjectSetup;
//# sourceMappingURL=ProjectSetup.js.map