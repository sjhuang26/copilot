/* eslint-disable */
import * as etch from 'etch';

export abstract class EtchComponent implements JSX.ElementClass {
    protected refs: any;

    public constructor(public props: JSX.Props) {
        this.refs = {};
    }

    public abstract render(): JSX.Element;

    public update(props: JSX.Props, children?: JSX.Element[]): Promise<void> {
        this.props = {...this.props, ...props};
        return etch.update(this);
    }

    public destroy(): Promise<void> {
        return etch.destroy(this);
    }
}