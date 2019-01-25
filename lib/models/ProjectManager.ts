import { MethodNotImplementedError } from './Errors';

/**
 * Represents a project (a.k.a a curriculum), and handles the setup / fast-forwarding / testing. 
 * Note: Project should not change once initialized! Anything that would normally constitute a state change (e..g fast-forwarding) should return a new project.
 */
export class ProjectManager {
    public constructor() {
        throw new Error("Method not implemented!");        
    }

    /**
     * Gets the root folder for this project
     */
    public getRootFolder(): string {
        throw new Error("Method not implemented!");        
    }

    /**
     * Runs the specified test
     * TODO: callback argument undetermined
     */
    public runTest(testName: string): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            reject(new MethodNotImplementedError("ProjectManager::runTest"));
        }); 

        return promise;
    }
    
    /*
     * Loads the specified manual
     * TODO: callback type undetermined
     * @param pageLocation The location of the manual relative to project root
     */
    public getManualPage(pageLocation: string): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            reject(new MethodNotImplementedError("ProjectManager::getManualPage"));
        }); 

        return promise;
    }
}