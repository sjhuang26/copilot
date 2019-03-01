import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs');

describe("Project Setup", () => {
    let root = 'spec/tmp/';
    let prjRoot = 'prj/';
    let curriculumRoot = 'cur/';
    
    beforeAll((done) => {
        // This function is from 
        // https://stackoverflow.com/questions/12627586/is-node-js-rmdir-recursive-will-it-work-on-non-empty-directories
        // as a quick n dirty solution
        let deleteFolderRecursive = function(path: string) {
            var files = [];
            if( fs.existsSync(path) ) {
                files = fs.readdirSync(path);
                files.forEach(function(file,index){
                    var curPath = path + "/" + file;
                    if(fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        };
        
        // Setup the directory
        root = fs.realpathSync('.') + '/' + root;
        prjRoot = root + prjRoot;
        curriculumRoot = root + curriculumRoot;
        
        function mkdirPromise(path: string): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                fs.mkdir(path, (err) => {
                    if(err) reject(err);
                    else resolve();
                })
            });
        }
        
        if(fs.existsSync(root)) {
            deleteFolderRecursive(root);
        }
        
        const mkdirRoot = mkdirPromise(root);
        const mkdirPrjRoot = mkdirPromise(prjRoot);
        const mkdirCurRoot = mkdirPromise(curriculumRoot);
        
        Promise.all([mkdirRoot, mkdirPrjRoot, mkdirCurRoot])
            .then(() => Copilot.initialize())
            .then(() => {
                let model = Copilot.getInstance();
                model.getEnvironmentManager().setProjectRoot(prjRoot);
                model.getEnvironmentManager().setCurriculumRoot(curriculumRoot);
                return model.getEnvironmentManager()
                    .setupProject("https://github.com/koreanwglasses/test-curriculum.git")
            }).then(() => done());
    });
    
    it("Should parse stages.json", () => {
        const model = Copilot.getInstance();
        const stages = model.getEnvironmentManager().getStages();
        
        expect(stages.length).toBe(2);
        
        expect(stages[0].id).toBe(1);
        expect(stages[0].parent).toBe(0);
        
        expect(stages[0].children.length).toBe(1);
        expect(stages[0].children[0]).toBe(2);
        
        expect(stages[0].tests.length).toBe(1);
        expect(stages[0].tests[0]).toBe('shuffle_test.py');
        
        expect(stages[0].instructions).toBe('step1.md');
        
        expect(stages[0].location).toBe("stage1/");
    });
});