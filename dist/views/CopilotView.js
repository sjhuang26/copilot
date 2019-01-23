"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectSetup_1 = require("./ProjectSetup");
const StartupPage_1 = require("./StartupPage");
/**
* This is the rool component for the sidebar. Eventually other things
* such as resizing, title, tabs, settings, etc. will be implemented.
*/
class CopilotView {
    constructor(state) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('copilot');
        if (state ? state.isVisible : false) {
            this.show();
        }
        else {
            this.hide();
        }
        // Construct components
        this.startupPage = new StartupPage_1.StartupPage(this, state ? state.startupPageState : null);
        this.element.appendChild(this.startupPage.getElement());
        this.projectSetup = new ProjectSetup_1.ProjectSetup(this, state ? state.projectSetupState : null);
        this.element.appendChild(this.projectSetup.getElement());
        // Keep track of which page is open
        if (this.startupPage.isVisible()) {
            this.currentComponent = this.startupPage;
        }
        if (this.projectSetup.isVisible()) {
            this.currentComponent = this.projectSetup;
        }
        else {
            this.showStartupPage();
        }
    }
    // Returns an object that can be retrieved when package is activated
    serialize() {
        return {
            isVisible: this.isVisible(),
            projectSetupState: this.projectSetup.serialize()
        };
    }
    // Tear down any state and detach
    destroy() {
        this.projectSetup.destroy();
        this.element.remove();
    }
    getElement() {
        return this.element;
    }
    showStartupPage() {
        if (this.currentComponent) {
            this.currentComponent.hide();
        }
        this.currentComponent = this.startupPage;
        this.currentComponent.show();
    }
    showProjectSetup() {
        if (this.currentComponent) {
            this.currentComponent.hide();
        }
        this.currentComponent = this.projectSetup;
        this.currentComponent.show();
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
exports.CopilotView = CopilotView;
//# sourceMappingURL=CopilotView.js.map