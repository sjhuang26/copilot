
import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import * as fs from 'fs-extra';
import { doesNotReject } from "assert";

describe("Fast Forward: test-curriculum", () => {
    let root = 'spec/tmp/';
    let prjRoot = 'prj2/';
    let curriculumRoot = 'cur2/';
    
    beforeAll((done) => {
        // Setup the directory
        root = fs.realpathSync('.') + '/' + root;
        prjRoot = root + prjRoot;
        curriculumRoot = root + curriculumRoot;
        
        const mkdirRoot = fs.mkdirp(root);
        const mkdirPrjRoot = fs.mkdirp(prjRoot);
        const mkdirCurRoot = fs.mkdirp(curriculumRoot);
        
        fs.pathExists(prjRoot).then((value) => {
            if(value) return fs.remove(prjRoot);
        }).then(() => {
            return fs.pathExists(curriculumRoot);
        }).then((value) => {
                if(value) return fs.remove(curriculumRoot);
        }).then(() => { 
            return Promise.all([mkdirRoot, mkdirPrjRoot, mkdirCurRoot]).then(() => {})
        }).then(() => Copilot.initialize())
        .then(() => {
            let model = Copilot.getInstance();
            model.getEnvironmentManager().setProjectRoot(prjRoot);
            model.getEnvironmentManager().setProjectMetaRoot(curriculumRoot);
            
            return model.getEnvironmentManager()
            .setupProject("https://github.com/koreanwglasses/test-curriculum.git")
        }).then(() => done())
        .catch((reason) => console.error(reason));
    });
    
    it("should successfully fast-forward to stage2 (merge single file)", () => {
        let model = Copilot.getInstance();
        return model.getWarpDrive().warpTo(2).then(() => {
            const readExpected = fs.readFile('spec/expected/deck_stage1-2.py', 'utf-8');
            const readActual = fs.readFile('spec/tmp/prj2/deck.py', 'utf-8');
            
            return Promise.all([readExpected, readActual]).then((value) => {
                expect(value[1]).toBe(value[0]);
            });
        })
    });
    
    it("should successfully fast-forward to stage3 (add new files)", () => {
        let model = Copilot.getInstance();
        return model.getWarpDrive().warpTo(3).then(() => {
            return fs.pathExists('spec/tmp/prj2/newfile.py').then((value) => {
                expect(value).toBeTruthy();
            });
        });
    });
    
});