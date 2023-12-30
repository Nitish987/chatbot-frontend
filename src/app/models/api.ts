import { Project } from "./project";

export interface Api {
    id: number;
    project: Project;
    product: string;
    type: string;
    apikey: string;
    configId: number;
    hitsCount: number;
    createdon: string;
}