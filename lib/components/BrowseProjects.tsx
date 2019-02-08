import * as etch from 'etch';
import { CopilotView } from './CopilotView';
import { Copilot } from '../models/Copilot'
import { EtchComponent } from './EtchComponent';
import axios from 'axios';

export interface BrowseProjectsProps extends JSX.Props {
    projects: ProjectInfo[];
}

/**
* Basic data about a project.
*/
export interface ProjectInfo {
    title: string;
    description: string;
    topic: string;
    url: string;
}

/**
* View for borwsing available projects.
*/
export class BrowseProjects extends EtchComponent {
    public props: BrowseProjectsProps;

    private parent: CopilotView;

    public constructor(props: BrowseProjectsProps) {
        super(props);
        this.props.projects = [];
        etch.initialize(this);
        axios.get("https://api.github.com/orgs/spaceport-curriculums/repos", {
            headers: {
                Accept: "application/vnd.github.mercy-preview+json"
            }
        })
        .then((response: any) => {
            let projects = [];
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                let project = {
                    title: data[i].name,
                    description: data[i].description,
                    topic: data[i].topics[0],
                    url: data[i].clone_url
                }
                projects.push(project);
            }
            this.props.projects = projects;
            etch.update(this);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    public render(): JSX.Element {
        const projectList = this.props.projects.map((project) =>
            <div class="project-tile">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>{project.topic}</p>
                <input type="button" class="btn" on={{click: () => this.startProject(project.url)}} value="Start Project" />
            </div>
        );
        return (
            <div class="box">
                <h2>Browse Projects</h2>
                <div class="project-list section scroll">{projectList}</div>
            </div>
        );
    }

    serialize(): BrowseProjectsProps {
        return {
            projects: this.props.projects
        };
    }

    startProject(source: string): void {
        const model = Copilot.getInstance();

        const promise = model.setupProject(source);
        promise.then((value) => {
            atom.notifications.addSuccess("Project successfully set up!");
        });
        promise.catch((reason) => {
            atom.notifications.addError("Uh oh! Something went wrong while trying to set up the project.");
            atom.notifications.addError(reason.message);
        })
    }
}
