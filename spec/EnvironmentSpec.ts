import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs-extra');

describe("Project Setup", () => {
    let root = 'spec/tmp/';
    let prjRoot = 'prj/';
    let curriculumRoot = 'cur/';
    
    beforeAll((done) => {
        // Setup the directory
        root = fs.realpathSync('.') + '/' + root;
        prjRoot = root + prjRoot;
        curriculumRoot = root + curriculumRoot;
        
        const mkdirRoot = fs.mkdirp(root);
        const mkdirPrjRoot = fs.mkdirp(prjRoot);
        const mkdirCurRoot = fs.mkdirp(curriculumRoot);
        
        fs.pathExists(root).then((value) => {
            if(value) return fs.remove(root);
        }).then(() => { 
            return Promise.all([mkdirRoot, mkdirPrjRoot, mkdirCurRoot]).then(() => {})
        }).then(() => Copilot.initialize())
        .then(() => {
            let model = Copilot.getInstance();
            model.getEnvironmentManager().setProjectRoot(prjRoot);
            model.getEnvironmentManager().setCurriculumRoot(curriculumRoot);

            return model.getEnvironmentManager()
                .setupProject("https://github.com/koreanwglasses/test-curriculum.git")
        }).then(() => done())
        .catch((reason) => console.error(reason));
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
        
        expect(stages[0].location).toBe("stage1f/");
    });
});