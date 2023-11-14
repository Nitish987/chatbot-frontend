import { Product } from "./product";
import { Project } from "./project";

export interface ProjectApi {
    id: number;
    project: Project;
    product: Product;
    apikey: string;
    createdon: string;
}