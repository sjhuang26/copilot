import { ProjectManager } from './ProjectManager';

export enum ErrorLevel {
    NoError, Warning, Error, FatalError
}

/**
* Describes the error state of an app
*/
export class ErrorState {
    public constructor() {
        throw new Error("Method not implemented!");        
    }
    
    /**
    * Returns the severity of the error
    */
    public getErrorLevel(): ErrorLevel {
        throw new Error("Method not implemented!");        
    }
    
    public getMessage(): string {
        throw new Error("Method not implemented!");        
    }
}

/**
* Contains the logic for main application. Handles persistend stuff (i.e. loading / saving / updating projects).
* All the operations return a boolean indicating success or failure. More information on the operation can be obtained with getErrorState().
*/
export class Copilot {
    private static instance: Copilot;
    private constructor() {
        throw new Error("Method not implemented!");        
    }
    
    /**
    * Sets up a new project for the specified curriculum in the current folder.
    * @param callback Callback result is true if the operation was successful, false if not, in which the error state will be set and can be accessed with application.getErrorState()
    * @param location The location of the folder or url of the repo that contains the curriculum/project to load
    * @param target The location on the disk to initial the new project
    * @return True if the operation was successful, false if not, in which the error state will be set and can be accessed with getErrorState
    */
    public setupProject(callback: (result: boolean, arg: Copilot) => void, location: string, target?: string ): boolean {
        throw new Error("Method not implemented!");        
    }
    
    /**
    * Loads a project from the `curriculum.json`. 
    * @param callback Callback result is true if the operation was successful, false if not, in which the error state will be set and can be accessed with application.getErrorState()
    */
    public loadProject( callback: (result: boolean, application: Copilot) => void ): boolean {
        throw new Error("Method not implemented!");        
    }
    
    /**
    * Fast-forwards to the specified branch, if it is legal* (will be defined better later)
    * @param callback Callback result is true if the operation was successful, false if not, in which the error state will be set and can be accessed with application.getErrorState()
    * @param branchName The name of the branch to fast-forward to
    */
    public fastForward( callback: (result: boolean, application: Copilot) => void, branchName: string, ): void {
        throw new Error("Method not implemented!");        
    }
    
    /**
    * Gets info on the current project, and null if no project is currently loaded
    */
    public getProject(): ProjectManager {
        throw new Error("Method not implemented!");        
    }
    
    /**
    * Returns the error state of the current application.
    */
    public getErrorState() {
        throw new Error("Method not implemented!");        
    }
    
    static getInstance(): Copilot {
        if(!this.instance) {
            this.instance = new Copilot();   
        }
        return this.instance;
    }
}