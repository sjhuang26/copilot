import * as etch from 'etch';
import * as showdown from 'showdown';
import { EtchComponent } from './EtchComponent';

export interface MarkdownRendererProps extends JSX.Props {
    markdown: string;
}

export class MarkdownRenderer extends EtchComponent {
    public props: MarkdownRendererProps;

    constructor(props: MarkdownRendererProps) {
        super(props);
        etch.initialize(this);
    }

    public render(): JSX.Element {
        ///////////////////////
        //// Preprocessing ////
        ///////////////////////


        /////////////////////////
        //// Convert to HTML ////
        /////////////////////////

        const converter = new showdown.Converter();
        let html = converter.makeHtml(this.props.markdown);

        ////////////////////////
        //// Postprocessing ////
        ////////////////////////


        return (
            <div innerHTML={html} ></div>
        );
    }
}