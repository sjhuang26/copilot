
import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs');

describe("Fast Forward: test-curriculum", () => {
    let root = 'spec/tmp/';
    let prjRoot = 'prj/';
    beforeAll((done) => {
        // Setup the directory
        root = fs.realpathSync('.') + '/' + root;
        prjRoot = root + prjRoot;

        if(fs.existsSync(root)) {
            fs.rmdirSync(root);
        }
        fs.mkdirSync(root);
        fs.mkdirSync(prjRoot);

        let model = Copilot.getInstance();
        model.setupProject("https://github.com/codingandcommunity/test-curriculum.git", prjRoot)

        done();
    });

    it("should successfully fast-forward to stage1", () => {
        let model = Copilot.getInstance();
        model.fastForward("stage1").then(() => {
            expect(fs.existsSync(prjRoot + 'deck.py'));        
        });
        
    });
});