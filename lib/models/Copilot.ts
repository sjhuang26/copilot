import { TestManager, TestState } from './TestManager';
import { EnvironmentManager, EnvironmentState } from './EnvironmentManager';
import { WarpDrive, WarpDriveState } from './WarpDrive';

export interface CopilotState {
    envState?: EnvironmentState;
    testState?: TestState;
    warpDriveState?: WarpDriveState;
}

/**
* Contains the logic for main application. Handles persistend stuff (i.e. loading / saving / updating projects).
* All the operations return a boolean indicating success or failure. More information on the operation can be obtained with getErrorState().
*/
export class Copilot {
    private static instance: Copilot;
    private static initializeCallbacks: (() => void)[] = [];
    
    private envMan: EnvironmentManager;
    private testManager: TestManager;
    private warpDrive: WarpDrive;
    

    private constructor(state?: CopilotState) {
        if(!state) state = {};
        
        this.envMan = new EnvironmentManager(this, state.envState);
        this.testManager = new TestManager(this, state.testState);
        this.warpDrive = new WarpDrive(this);

    }
    
    public init(): Promise<void> {
        return this.envMan.init()
            .then(() => Promise.all([this.testManager.init(), this.warpDrive.init()]))
            .then(() =>{});
    }
    
    public getEnvironmentManager(): EnvironmentManager {
        return this.envMan;
    }
    
    public getTestManager(): TestManager {
        return this.testManager;
    }
    
    public getWarpDrive(): WarpDrive {
        return this.warpDrive;
    }
    
    /**
     * Registers a callback to execute when the model finishes its initialization.
     * @param callback 
     */
    static onInitialize(callback: () => void) {
        this.initializeCallbacks.push(callback);
    }

    /**
    * Initialized an instance of the app. Currently just creates a new insteance, but
    * in future versions will read from files and objects containing initialization
    * info
    */
    static initialize(state?: CopilotState): Promise<void> {
        this.instance = new Copilot(state);
        return this.instance.init().then(() => {
            for(let callback of this.initializeCallbacks) callback();
        });
    }
    
    static getInstance(): Copilot {
        if(!this.instance) {
            throw new Error("Copilot has not been initialized!");
        }
        return this.instance;
    }
}