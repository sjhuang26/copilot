"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorLevel;
(function (ErrorLevel) {
    ErrorLevel[ErrorLevel["NoError"] = 0] = "NoError";
    ErrorLevel[ErrorLevel["Warning"] = 1] = "Warning";
    ErrorLevel[ErrorLevel["Error"] = 2] = "Error";
    ErrorLevel[ErrorLevel["FatalError"] = 3] = "FatalError";
})(ErrorLevel = exports.ErrorLevel || (exports.ErrorLevel = {}));
/**
* Describes the error state of an app
*/
class ErrorState {
    constructor() {
        throw new Error("Method not implemented!");
    }
    /**
    * Returns the severity of the error
    */
    getErrorLevel() {
        throw new Error("Method not implemented!");
    }
    getMessage() {
        throw new Error("Method not implemented!");
    }
}
exports.ErrorState = ErrorState;
/**
* Contains the logic for main application. Handles persistend stuff (i.e. loading / saving / updating projects).
* All the operations return a boolean indicating success or failure. More information on the operation can be obtained with getErrorState().
*/
class Copilot {
    constructor() {
        // throw new Error("Method not implemented!");        
    }
    /**
    * Sets up a new project for the specified curriculum in the current folder.
    * @param callback Callback result is true if the operation was successful, false if not, in which the error state will be set and can be accessed with application.getErrorState()
    * @param location The location of the folder or url of the repo that contains the curriculum/project to load
    * @param target The location on the disk to initial the new project
    * @return True if the operation was successful, false if not, in which the error state will be set and can be accessed with getErrorState
    */
    setupProject(callback, location, target) {
        throw new Error("Method not implemented!");
    }
    /**
    * Loads a project from the `curriculum.json`.
    * @param callback Callback result is true if the operation was successful, false if not, in which the error state will be set and can be accessed with application.getErrorState()
    */
    loadProject(callback) {
        throw new Error("Method not implemented!");
    }
    /**
    * Fast-forwards to the specified branch, if it is legal* (will be defined better later)
    * @param callback Callback result is true if the operation was successful, false if not, in which the error state will be set and can be accessed with application.getErrorState()
    * @param branchName The name of the branch to fast-forward to
    */
    fastForward(callback, branchName) {
        throw new Error("Method not implemented!");
    }
    /**
    * Gets info on the current project, and null if no project is currently loaded
    */
    getProject() {
        throw new Error("Method not implemented!");
    }
    /**
    * Returns the error state of the current application.
    */
    getErrorState() {
        throw new Error("Method not implemented!");
    }
    /**
     * Initialized an instance of the app. Currently just creates a new insteance, but
     * in future versions will read from files and objects containing initialization
     * info
     */
    static initialize() {
        this.instance = new Copilot();
    }
    static getInstance() {
        if (!this.instance) {
            throw new Error("Copilot has not been initialized!");
        }
        return this.instance;
    }
}
exports.Copilot = Copilot;
//# sourceMappingURL=Copilot.js.map