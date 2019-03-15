import { MethodNotImplementedError } from "./Errors";
import { Copilot } from "./Copilot";
import * as fs from 'fs-extra';


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
        const prjRoot = this.parent.getEnvironmentManager().getProjectRoot();
        const curRoot = this.parent.getEnvironmentManager().getCurriculumRoot();
        
        const stages = this.parent.getEnvironmentManager().getStages();
        
        // Add code to find stage id later
        const stageRoot = curRoot + '/' + stages[1].location;

        function splice(source: string, dest: string): string {
            // Extract splice regions in source
            const sourceLines = source.split('\n');
            const regions: { [key:string]:{active: boolean, contents: string[]} } = {};
            for(let line of sourceLines) {
                // Find BEGIN and start new regions
                const begin = /### BEGIN (\w+).*/.exec(line);
                if (begin) {
                    if(regions[begin[1]]) {
                        throw new Error('Multiple declarations of region "' + begin[1] + '"');
                    } else {
                        regions[begin[1]] = {active: true, contents: []};
                    }
                }

                // Find END and close regions
                const end = /### END (\w+).*/.exec(line);
                if(end) {
                    if(regions[end[1]]) {
                        regions[end[1]].active = false;
                    }
                }

                // Add lines to existing regions
                for(let key of Object.keys(regions)) {
                    const region = regions[key];
                    if(region.active && (!begin || key != begin[1])) {
                        region.contents.push(line);
                    }
                }
            }

            // Splice into dest
            const destLines = dest.split('\n');

            for(let i = destLines.length - 1; i >= 0 ; i--) {
                const line = destLines[i];
                const splice = /### SPLICE (\w+).*/.exec(line);
                if(splice && regions[splice[1]]) {
                    destLines.splice(i, 1, ...regions[splice[1]].contents);
                }
            }

            return destLines.join('\n');
        }

        function spliceFile(file: string): Promise<void> {
            const readSource = fs.readFile(stageRoot + '/' + file, 'utf-8'); 
            const readDest = fs.readFile(prjRoot + '/' + file, 'utf-8'); 

            return Promise.all([readSource, readDest])
                .then((value) => {
                    const data = splice(value[0], value[1]);
                    return fs.writeFile(prjRoot + '/' + file, data, {flag: 'w'});
                });
        }

        function spliceAllFilesRecursive(relDirectory: string): Promise<void> {
            const fullDirectory = prjRoot + relDirectory;
            return fs.readdir(fullDirectory)
                .then((paths) => {
                    const relPaths = paths.map((path) => relDirectory + path);
                    const promises: Promise<void>[] = [];

                    for(let relPath of relPaths) {
                        const fullPath = prjRoot + relPath;
                        const promise = fs.lstat(fullPath).then((stats) => {
                            if(stats.isFile()) {
                                return spliceFile(relPath);
                            } else if (stats.isDirectory()) {
                                return spliceAllFilesRecursive(relPath);
                            }
                        });
                        promises.push(promise);
                    }

                    return Promise.all(promises).then(() => {});
                });
        }

        return spliceAllFilesRecursive(''); 
    }
}