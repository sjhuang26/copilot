import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";
import * as fs from "fs-extra";
import * as simplegit from 'simple-git/promise';
import { strictEqual } from "assert";

export interface ProjectMeta {
    stages: Array<Stage>;
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
    curriculumRoot?: string;
    projectMetaRoot?: string;
    projectRoot?: string;

    currentStageId?: number;
}

export class EnvironmentManager {
    private parent: Copilot;
    private curriculumRoot: string;
    private projectMetaRoot: string;
    private projectRoot: string;

    private currentStageId: number;
    
    private projectMeta: ProjectMeta;
    
    constructor(parent: Copilot, state?: EnvironmentState) {
        this.parent = parent;
        
        if(state.curriculumRoot) this.curriculumRoot = state.curriculumRoot;
        if(state.projectMetaRoot) this.projectMetaRoot = state.projectMetaRoot;
        if(state.projectRoot) this.projectRoot = state.projectRoot;
        if(state.currentStageId) this.currentStageId = state.currentStageId;

        this.projectMeta = null; 
    }
    
    /**
    * Loads up the environment from json files 
    * Currently only loads the location of the project meta files from the osc_project.json file
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error
    */
    public init(): Promise<void> {
        const self = this;

        this.projectMeta = {stages: null};

        const readProjectState = (state: EnvironmentState) => {
            if(state && state.projectMetaRoot) {
                this.projectMetaRoot = state.projectMetaRoot;
            }
            if(state && state.currentStageId) {
                this.currentStageId = state.currentStageId;
            }
        }

        const parseStages = () => {
            const path = this.projectMetaRoot + '/stages.json'
        
            return fs.pathExists(path)
            .then((value) => {
                if(value) {
                    return fs.readJson(path)
                        .then((value1) => self.projectMeta.stages = value1 as Array<Stage>);
                }
            });
        }
        
        return this.loadProjectState()
        .then(readProjectState)
        .then(parseStages)
        .then(() => {})
    }
    
    /**
    * Sets the folder that contains info for the various curriculums
    */
    public setProjectMetaRoot(path: string): void {
        this.projectMetaRoot = path;
    }

    /**
    * Sets the folder that contains info for the various curriculums
    */
    public getProjectMetaRoot(): string {
        return this.projectMetaRoot;
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
        return this.projectRoot;
    }
    
    /**
     * Saves project info, such as what the project is called, what the upstream is, where the project
     * meta is located, etc. Currently just saves to osc_project.json, though this may be changed.
     */
    public saveProjectState(): Promise<void> {
        let state: EnvironmentState = {};
        state.projectMetaRoot = this.projectMetaRoot;
        state.currentStageId = this.currentStageId;
        return fs.writeJson(this.projectRoot + '/copilot.json', state);
    }
    
    /**
     * Loads project info from osc_project.json
     */
    private loadProjectState(): Promise<EnvironmentState> {
        let file = this.projectRoot + '/copilot.json';
        return fs.pathExists(file).then((exists) => {
            if(exists)
                return fs.readJson(file)
            else 
                return Promise.resolve(null);
        });
    }

    /**
    * Downloads a curriculum, sets up the file structure for the project, and sets up the environment as well.
    * @param remote The url of the repo that contains the project/project meta to load
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public setupProject(remote: string): Promise<void> {
        if(!this.getProjectRoot()) {
            throw new Error("Project root is not set!");
        }
        if(!this.getProjectMetaRoot()) {
            const repoName = remote.match(/([^\/]*\/)?[^\/]*$/)[0]; // Extracts last portion of repo
            this.setProjectMetaRoot(this.curriculumRoot + '/' + repoName);
        }

        const projectMetaRoot = this.getProjectMetaRoot();
        const projectRoot = this.getProjectRoot();
        
        const self = this;
        const git = simplegit();

        const clearDir = () => fs.pathExists(projectMetaRoot)
            .then((value) => {
                if(value) {
                    return fs.remove(projectMetaRoot);
                }
            });

        const clonePromise = () => git.clone(remote, projectMetaRoot);

        const projectSetup = () => { 
            const stages = this.getStages();
            this.currentStageId = 0;
            const stageLocation = projectMetaRoot + '/' + stages[0].location;
            return fs.copy(stageLocation, projectRoot, {errorOnExist: true} );
        }
        
        return clearDir()
            .then(clonePromise)
            .then(() => this.saveProjectState())
            .then(() => this.parent.init())
            .then(projectSetup)
    }
    
    /**
    * Returns curriculum variables
    */
    public getProjectMeta(): ProjectMeta {
        return this.projectMeta;
    }
    
    public getStages(): Array<Stage> {
        return this.projectMeta.stages;
    }

    public getStageById(stageID: number): Stage {
        for(let stage of this.projectMeta.stages) {
            if(stage.id == stageID) return stage;
        }
    }

    public getCurrentStageId(): number {
        return this.currentStageId;
    }

    public setCurrentStageId(stageId: number): void {
        this.currentStageId = stageId;
    }

}