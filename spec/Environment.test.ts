import { Copilot } from '../lib/models/Copilot';
import * as fs from 'fs-extra';
import { TEST_REPO } from './TestVariables';

describe("Project Setup", () => {
    let root = 'spec/tmp/';
    let prjRoot = 'prj1/';
    let curriculumRoot = 'cur1/';
    
    beforeAll(() => {
        // Setup the directory
        root = fs.realpathSync('.') + '/' + root;
        prjRoot = root + prjRoot;
        curriculumRoot = root + curriculumRoot;
        
        return fs.pathExists(prjRoot).then((value) => {
            if(value) return fs.remove(prjRoot);
        }).then(() => {
            return fs.pathExists(curriculumRoot)
        }).then((value) => {
            if(value) return fs.remove(curriculumRoot);
        }).then(() => { 
            const mkdirRoot = fs.mkdirp(root);
            const mkdirPrjRoot = fs.mkdirp(prjRoot);
            const mkdirCurRoot = fs.mkdirp(curriculumRoot);

            return Promise.all([mkdirRoot, mkdirPrjRoot, mkdirCurRoot]).then(() => {})
        }).then(() => Copilot.initialize({
            envState: {
                curriculumRoot: curriculumRoot
            }
        }))
        .then(() => {
            let model = Copilot.getInstance();
            model.getEnvironmentManager().setProjectRoot(prjRoot);
            model.getEnvironmentManager().setProjectMetaRoot(curriculumRoot);

            return model.getEnvironmentManager().setupProject(TEST_REPO)
        });
    });
    
    test("Should parse stages.json", () => {
        const model = Copilot.getInstance();
        const stages = model.getEnvironmentManager().getStages();
        
        expect(stages.length).toBe(3);
        
        expect(stages[0].id).toBe(1);
        expect(stages[0].parent).toBe(0);
        
        expect(stages[0].children.length).toBe(1);
        expect(stages[0].children[0]).toBe(2);
        
        expect(stages[0].tests.length).toBe(1);
        expect(stages[0].tests[0]).toBe('shuffle_test.py');
        
        expect(stages[0].instructions).toBe('step1.md');
        
        expect(stages[0].location).toBe("stage1f/");
    });
});