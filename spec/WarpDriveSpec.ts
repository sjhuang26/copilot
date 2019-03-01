
import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs-extra');
import { doesNotReject } from "assert";

describe("Fast Forward: test-curriculum", () => {
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

    it("should successfully fast-forward to stage2", (done) => {
        let model = Copilot.getInstance();
        model.getWarpDrive().warpTo("stage2").then(() => {
            const readExpected = fs.readFile('spec/expected/deck_stage1-2.py', 'utf-8');
            const readActual = fs.readFile('spec/tmp/prj/deck.py', 'utf-8');

            return Promise.all([readExpected, readActual]).then((value) => {
                expect(value[1]).toBe(value[0]);
                done();
            });
        }).catch((reason) => {
            done();
        });
    });
    
});