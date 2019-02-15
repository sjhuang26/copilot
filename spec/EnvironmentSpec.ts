import "jasmine";
import { Copilot } from '../lib/models/Copilot';
import fs = require('fs');

describe("Project Setup", () => {
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
            deleteFolderRecursive(root);
        }
        fs.mkdirSync(root);
        fs.mkdirSync(prjRoot);

        Copilot.initialize();

        done();
    });


    // it("Should download and setup project/curriculum in correct folder", () => {
    //     let model = Copilot.getInstance();
    //     expect(() => { model.getEnvironmentManager().setupProject("https://github.com/codingandcommunity/test-curriculum.git", prjRoot) }).not.toThrow();

    //     // Currently only one file
    //     expect(fs.existsSync(prjRoot + 'deck.py'));        
    // });
});