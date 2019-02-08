import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";

export interface WarpDriveState {

}

export class WarpDrive {
    constructor(parent: Copilot, state?: WarpDriveState) {
        // throw new MethodNotImplementedError("WarpDrive::constructor");
    }

    /**
     * Initializes whatever is needed to fast forward
     */
    public init(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            // reject(new MethodNotImplementedError("WarpDrive::init"));
            resolve();
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
}