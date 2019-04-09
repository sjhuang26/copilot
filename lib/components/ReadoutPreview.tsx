import * as etch from 'etch';
import * as electron from 'electron';
import { File } from 'atom';
import { EtchComponent } from "./EtchComponent";
import { CopilotView } from './CopilotView';
import { MarkdownRenderer } from './MarkdownRenderer';

export interface ReadoutPreviewProps extends JSX.Props {
    currentFile?: string;
    markdown: string;
}

export class ReadoutPreview extends EtchComponent {
    public readonly props: ReadoutPreviewProps;
    private parent: CopilotView;

    constructor(props: ReadoutPreviewProps) {
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.loadReadout = this.loadReadout.bind(this);
        this.props.currentFile = props.currentFile;
        this.props.markdown = "Load a file";

        etch.initialize(this);
    }

    render(): JSX.Element {
        return (
            <div class="box">
                <div class="header">
                    <h2>Preview a markdown file</h2>
                    <input type="button" class="btn" value="Open" on={{click: this.selectFile}} /> { this.props.currentFile || "No file selected" } <br/>
                    <input type="button" class="btn" value="Go!" on={{click: this.loadReadout}} />
                    <hr/>
                </div>
                <div class="section scroll">
                    <MarkdownRenderer markdown={this.props.markdown} ref="markdownRenderer" />
                </div>
            </div>
        );
    }

    serialize(): ReadoutPreviewProps {
        return {
            currentFile: this.props.currentFile,
            markdown: this.props.markdown
        }
    }

    selectFile() {
        const remote = electron.remote;
        var files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {properties: ["openFile"]});
        if (files) this.update({currentFile: files[0]});
    }

    loadReadout() {
        this.update({markdown: "Loading..."});

        const file = new File(this.props.currentFile);
        file.read().then((value) => {
            this.update({markdown: value})
        }).catch((reason) => {
            atom.notifications.addError(reason);
            this.update({markdown: "Error loading markdown"});
        });
    }

    public update(props: Partial<ReadoutPreviewProps>, children?: JSX.Element[]): Promise<void> {
        if (this.props.markdown != props.markdown) {
            this.refs.markdownRenderer.update({markdown: this.props.markdown})
        }
        return super.update(props, children)
    }
}
