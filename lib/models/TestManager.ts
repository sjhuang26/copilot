import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";

export interface TestFeedback {
    /**
     * Did the tests pass satisfactorily
     */
    success(): boolean;

    /**
     * Gets basic feedback from the test
     */
    getMessage(): string;

    // Anything other information that might seem useful
}

export interface TestState {
    // Whatever you might want to save between sessions, though most of the information you need should be pulled from the environment manager
}

export class TestManager {
    constructor(parent: Copilot, state?: TestState) {
        // throw new MethodNotImplementedError("TestManager::constructor");
    }

    /**
     * Initializes whatever is needed to run tests, such as names, files, etc. Also reads any needed info from json files
     */
    public init(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            reject(new MethodNotImplementedError("TestManager::init"));
        }); 

        return promise;
    }

    public serialize(): TestState {
        return {};
    }

    /**
     * Finds and runs the specified test.
     * @param testName The name of the test to run.
     */
    public runTest(testName: string): Promise<TestFeedback> {
        const promise = new Promise<TestFeedback>((resolve, reject) => {
            // reject(new MethodNotImplementedError("TestManager::runTest"));
            resolve();
        }); 

        return promise;
    }
}