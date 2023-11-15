import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Project } from 'src/app/models/project';
import { ProductService } from 'src/app/modules/console/services/product/product.service';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';
import { ProjectApiService } from '../../services/project-api/project-api.service';
import { ProjectApi } from 'src/app/models/project-apis';

@Component({
  selector: 'app-project-apis',
  templateUrl: './project-apis.component.html',
  styleUrls: ['./project-apis.component.css']
})
export class ProjectApisComponent implements OnInit {
  project: Project | null = null;
  products: Product[] = [];
  projectApis: ProjectApi[] = [];

  constructor(private productService: ProductService, private projectService: ProjectService, private workingProjectService: WorkingProjectService, private projectApiService: ProjectApiService) { }

  ngOnInit(): void {
    this.productService.getProducts$.subscribe(products => {
      this.products = products;
    });
    this.workingProjectService.getWorkingProjectId$.subscribe(id => {
      if (id !== null) {
        this.projectService.getProject(id).subscribe(project => {
          this.project = project;
        });
        this.loadProjectApis(id);
      } else {
        this.project = null;
      }
    });
    this.projectApiService.getProjectApis$.subscribe(projectApis => {
      this.projectApis = projectApis;
    });
  }

  loadProjectApis(projectId: string) {
    this.projectApiService.listApis(projectId).subscribe(void 0);
  }

  openCreateApiDialog() {
    document.getElementById('creatProjectApiBtn')?.click();
  }
}
