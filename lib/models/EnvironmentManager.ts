import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";
import * as fs from "fs-extra";
import * as simplegit from 'simple-git/promise';

export interface CurriculumInfo {
    
}

export interface Stage {
    /**
    * ID of the stage
    */
    id: number;
    
    /**
    * ID of the parent stage
    */
    parent: number;
    
    /**
    * ID's of the child stages
    */
    children: Array<number>
    
    /**
    * A list of files that are used to test
    */
    tests: Array<string>
    
    /**
    * The file with the instructions for this step
    */
    instructions: string
    
    /**
    * The location of the stage on the filesystem
    */
    location: string
}

export interface EnvironmentState {
    // Whatever information you want to save between sessions, though most of the information you need should be in the filesystem.
}

export class EnvironmentManager {
    private parent: Copilot;
    private projectRoot: string;
    private curriculumRoot: string;
    
    private stages: Array<Stage>;
    
    constructor(parent: Copilot, state?: EnvironmentState) {
        this.parent = parent;
    }
    
    /**
    * Loads up the environment from json files 
    * Things it should do:
    * - Load and parse the curriculum.json into an object, which should be accessible with getCurriculumInfo
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public init(): Promise<void> {
        const self = this;
        const root = self.parent.getEnvironmentManager().getCurriculumRoot();
        const path = root + '/stages.json'
        
        const parseStagesPromise = fs.pathExists(path)
            .then((value) => {
                if(value) {
                    return fs.readJson(path)
                        .then((value1) => self.stages = value1 as Array<Stage>);
                }
            });
        
        return Promise.all([parseStagesPromise]).then(() => {});
    }
    
    public serialize(): EnvironmentState {
        return {};
    }
    
    /**
    * Sets the folder that contains info for the various curriculums
    */
    public setCurriculumRoot(path: string): void {
        this.curriculumRoot = path;
    }
    
    /**
    * Sets the folder that contains info for the various curriculums
    */
    public getCurriculumRoot(): string {
        return this.curriculumRoot;
    }
    
    /**
    * Sets the root folder for the current project
    * @param path Path to the new root
    */
    public setProjectRoot(path: string): void {
        this.projectRoot = path;
    }
    
    /**
    * Gets the root folder for the current project
    */
    public getProjectRoot(): string {
        return this.projectRoot
    }
    
    /**
    * Downloads a curriculum, sets up the file structure for the project, and sets up the environment as well.
    * @param location The location of the folder or url of the repo that contains the curriculum/project to load
    * @param projectTarget The location on the disk to initialize the new project
    * @param curriculumTarget The location on the disk to save to curriculum
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public setupProject(location: string, projectTarget?: string, curriculumTarget?: string ): Promise<void> {
        const curriculumRoot = curriculumTarget || this.getCurriculumRoot();
        const projectRoot = projectTarget || this.getProjectRoot();
        
        const self = this;
        const git = simplegit();
        const clonePromise = git.clone(location, curriculumRoot);
        
        const projectSetup = () => { 
            const stages = self.getStages();
            const stageLocation = curriculumRoot + '/' + stages[0].location;
            return fs.copy(stageLocation, projectRoot, {errorOnExist: true} );
        }
        
        return clonePromise
            .then(() => self.parent.init())
            .then(() => projectSetup());
    }
    
    /**
    * Returns curriculum variables
    */
    public getCurriculumInfo(): CurriculumInfo {
        throw new MethodNotImplementedError("EnvironmentManager::getCurriculumInfo");
    }
    
    public getStages(): Array<Stage> {
        return this.stages;
    }
}