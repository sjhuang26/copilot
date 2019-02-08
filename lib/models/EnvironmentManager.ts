import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";

export interface CurriculumInfo {

}

export interface EnvironmentState {
    // Whatever information you want to save between sessions, though most of the information you need should be in the filesystem.
}

export class EnvironmentManager {
    constructor(parent: Copilot, state?: EnvironmentState) {
        // throw new MethodNotImplementedError("EnvironmentManager::constructor");
    }

   /**
    * Loads up the environment from json files 
    * Things it should do:
    * - Load and parse the curriculum.json into an object, which should be accessible with getCurriculumInfo
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public init(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            // reject(new MethodNotImplementedError("EnvironmentManager::loadProject"));
            resolve();
        }); 

        return promise;
    }

    public serialize(): EnvironmentState {
        return {};
    }

    /**
     * Sets the root folder for the current project
     * @param path Path to the new root
     */
    public setProjectRoot(path: string): void {
        throw new MethodNotImplementedError("EnvironmentManager::setProjectRoot");
    }

    /**
     * Gets the root folder for the current project
     */
    public getProjectRoot(): string {
        throw new MethodNotImplementedError("EnvironmentManager::getProjectRoot");
    }

    /**
    * Downloads a curriculum, sets up the file structure for the project, and sets up the environment as well.
    * @param location The location of the folder or url of the repo that contains the curriculum/project to load
    * @param target The location on the disk to initial the new project
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public setupProject(location: string, target?: string ): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            reject(new MethodNotImplementedError("EnvironmentManager::setupProject"));
        });

        return promise;
    }

    /**
     * Returns curriculum variables
     */
    public getCurriculumInfo(): CurriculumInfo {
        throw new MethodNotImplementedError("EnvironmentManager::getCurriculumInfo");
    }
}