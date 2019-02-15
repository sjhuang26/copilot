
import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs');

describe("Fast Forward: test-curriculum", () => {
    let root = 'spec/tmp/';
    let prjRoot = 'prj/';
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
        
        if(fs.existsSync(root)) {
            deleteFolderRecursive(root)
        }
        fs.mkdirSync(root);
        fs.mkdirSync(prjRoot);
        
        Copilot.initialize();
        let model = Copilot.getInstance();
        model.getEnvironmentManager().setProjectRoot(prjRoot);
        model.getEnvironmentManager()
            .setupProject("https://github.com/koreanwglasses/test-curriculum.git", prjRoot)
            .then(() => done());
    });

    it("Should parse stages.json", () => {
        const model = Copilot.getInstance();
        const stages = model.getWarpDrive().getStages();
        
        expect(stages.length).toBe(2);

        expect(stages[0].id).toBe(1);
        expect(stages[0].parent).toBe(0);

        expect(stages[0].children.length).toBe(1);
        expect(stages[0].children[0]).toBe(2);

        expect(stages[0].tests.length).toBe(1);
        expect(stages[0].tests[0]).toBe('shuffle_test.py');

        expect(stages[0].instructions).toBe('step1.md');
    });
    
    // it("should successfully fast-forward to stage1", () => {
    //     let model = Copilot.getInstance();
    //     model.getWarpDrive().warpTo("stage1").then(() => {
    //         expect(fs.existsSync(prjRoot + 'deck.py'));        
    //     });
    // });
    
});