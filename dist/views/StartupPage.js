"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* An test view that sets up projects
*/
class StartupPage {
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
        title.innerText = "Hello! I am your Copilot.";
        this.element.appendChild(title);
        const projectSetup = document.createElement("input");
        projectSetup.setAttribute('type', 'button');
        projectSetup.setAttribute('value', 'Setup a new Project');
        projectSetup.addEventListener('click', () => {
            parent.showProjectSetup();
        });
        this.element.appendChild(projectSetup);
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
}
exports.StartupPage = StartupPage;
//# sourceMappingURL=StartupPage.js.map