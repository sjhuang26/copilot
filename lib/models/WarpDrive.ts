import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";
import * as fs from 'fs';


export interface WarpDriveState {

}

export class WarpDrive {
    private parent: Copilot;

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
        return new Promise<void>( (resolve, reject) => resolve() );
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
}