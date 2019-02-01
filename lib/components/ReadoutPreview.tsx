import * as etch from 'etch';
import * as electron from 'electron';
import { File } from 'atom';
import { EtchComponent } from "./EtchComponent";
import { CopilotView } from './CopilotView';
import { MarkdownRenderer } from './MarkdownRenderer';

export interface ReadoutPreviewProps extends JSX.Props {
    currentFile?: string;
}

export class ReadoutPreview extends EtchComponent {
    public props: ReadoutPreviewProps;

    private parent: CopilotView;
    private currentFile: string;
    private markdown:string;

    constructor(props: ReadoutPreviewProps) {
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.loadReadout = this.loadReadout.bind(this);
        this.currentFile = props.currentFile;
        this.markdown = "Load a file";

        etch.initialize(this);
    }

    render(): JSX.Element {
        return (
            <div class="box">
                <div class="header">
                    <h2>Preview a markdown file</h2> 
                    <input type="button" class="btn" value="Open" on={{click: this.selectFile}} /> { this.currentFile || "No file selected" } <br/>
                    <input type="button" class="btn" value="Go!" on={{click: this.loadReadout}} />
                    <hr/>
                </div>
                <div class="section scroll">
                    <MarkdownRenderer markdown={this.markdown} ref="markdownRenderer" />
                </div>
            </div>
        );
    }

    serialize(): ReadoutPreviewProps {
        return {
            currentFile: this.currentFile
        }
    }

    selectFile() {
        const remote = electron.remote;
        var files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {properties: ["openFile"]});
        this.currentFile = files[0];
    }

    loadReadout() {
        this.markdown = "Loading...";
        this.refs.markdownRenderer.update({markdown: this.markdown});

        const self = this;
        const file = new File(this.currentFile);
        file.read().then((value) => {
            self.markdown = value;
            this.refs.markdownRenderer.update({markdown: self.markdown});
        }).catch((reason) => {
            atom.notifications.addError(reason);
            self.markdown = "Error loading markdown";
            this.refs.markdownRenderer.update({markdown: self.markdown});
        });
    }
}