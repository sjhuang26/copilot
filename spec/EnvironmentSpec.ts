import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs');

describe("Project Setup", () => {
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

        done();
    });

    it("Should download and setup project/curriculum in correct folder", () => {
        let model = Copilot.getInstance();
        expect(() => { model.setupProject("https://github.com/codingandcommunity/test-curriculum.git", prjRoot) }).not.toThrow();

        // Currently only one file
        expect(fs.existsSync(prjRoot + 'deck.py'));        
    });
});