import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";
import * as fs from 'fs';

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

export interface WarpDriveState {

}

export class WarpDrive {
    private parent: Copilot;
    private stages: Array<Stage>

    constructor(parent: Copilot, state?: WarpDriveState) {
        this.parent = parent;
    }

    /**
     * Initializes whatever is needed to fast forward.
     * 
     * Currently reads in the stages.json, though this functionality may be moved
     * to EnvironmentManager
     */
    public init(): Promise<void> {
        const self = this;
        const promise = new Promise<void>((resolve, reject) => {
            const root = self.parent.getEnvironmentManager().getCurriculumRoot();
            const path = root + '/stages.json'

            const parseStagesPromise = new Promise<void>((resolve1, reject1) => {
                function parseData(data: string) {
                    let obj: any;
                    try {
                        obj = JSON.parse(data);
                    } catch (e) {
                        return reject1(e);
                    }

                    self.stages = obj as Array<Stage>;
                    return resolve1();
                }

                fs.exists(path, (exists) => {
                    if(exists) {
                        fs.readFile(path, 'utf8', (err, data) => {
                            if(err) return reject1(err);
                            else return parseData(data);
                        });
                    } else {
                        self.stages = null;
                        resolve1();
                    }
                });
            });

            Promise.all([parseStagesPromise]).then( ()=> {
                resolve();
            }).catch((reason) => {
                reject(reason);
            })
        }); 

        return promise;
    }
   
    public serialize(): WarpDriveState {
        return {};
    }

   /**
    * Fast-forwards to the specified branch, if it is legal* (will be defined better later)
    * @param branchName The name of the branch to fast-forward to
    * @returns A promise the resolves with the instance of the model in use, and rejects with an Error (or subtype of Error).
    */
    public warpTo( branchName: string ): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            reject(new MethodNotImplementedError("WarpDrive::warpTo"));
        }); 

        return promise;
    }

    public getStages(): Array<Stage> {
        return this.stages;
    }
}