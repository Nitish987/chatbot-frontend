import { Api } from "./api";

export interface Emform {
    id: number;
    api: Api;
    name: string;
    config: any[];
    createdon: string;
    updatedon: string;
}