import { MethodNotImplementedError } from './Errors';
import { ProjectManager } from './ProjectManager';

/**
* Contains the logic for main application. Handles persistend stuff (i.e. loading / saving / updating projects).
* All the operations return a boolean indicating success or failure. More information on the operation can be obtained with getErrorState().
*/
export class Copilot {
    private static instance: Copilot;
    private constructor() {
        // throw new Error("Method not implemented!");        
    }
    
    /**
     * Sets the root folder for the current project
     * @param path Path to the new root
     */
    public setProjectRoot(path: string): void {
        throw new MethodNotImplementedError("Copilot::setProjectRoot");
    }

    /**
    * Sets up a new project for the specified curriculum in the current folder.
    * @param location The location of the folder or url of the repo that contains the curriculum/project to load
    * @param target The location on the disk to initial the new project
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public setupProject(location: string, target?: string ): Promise<Copilot> {
        const promise = new Promise<Copilot>((resolve, reject) => {
            reject(new MethodNotImplementedError("Copilot::setupProject"));
        }); 

        return promise;
    }
    
    /**
    * Loads a project from the `curriculum.json`. 
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public loadProject(): Promise<Copilot> {
        const promise = new Promise<Copilot>((resolve, reject) => {
            reject(new MethodNotImplementedError("Copilot::loadProject"));
        }); 

        return promise;
    }
    
    /**
    * Fast-forwards to the specified branch, if it is legal* (will be defined better later)
    * @param branchName The name of the branch to fast-forward to
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public fastForward( branchName: string, ): Promise<Copilot> {
        const promise = new Promise<Copilot>((resolve, reject) => {
            reject(new MethodNotImplementedError("Copilot::fastForward"));
        }); 

        return promise;
    }
    
    /**
    * Gets info on the current project, and null if no project is currently loaded
    */
    public getProject(): ProjectManager {
        throw new Error("Method not implemented!");        
    }
    
    /**
     * Initialized an instance of the app. Currently just creates a new insteance, but
     * in future versions will read from files and objects containing initialization
     * info
     */
    static initialize(): void {
        this.instance = new Copilot();
    }

    static getInstance(): Copilot {
        if(!this.instance) {
            throw new Error("Copilot has not been initialized!");
        }
        return this.instance;
    }
}