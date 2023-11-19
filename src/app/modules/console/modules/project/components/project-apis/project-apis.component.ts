import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';
import { ProjectApiService } from '../../services/project-api/project-api.service';
import { Api } from 'src/app/models/api';
import { Product } from 'src/app/constants/products';

@Component({
  selector: 'app-project-apis',
  templateUrl: './project-apis.component.html',
  styleUrls: ['./project-apis.component.css']
})
export class ProjectApisComponent implements OnInit {
  project: Project | null = null;
  projectApis: Api[] = [];
  projectApiSelected: Api | null = null;

  constructor(private projectService: ProjectService, private workingProjectService: WorkingProjectService, private projectApiService: ProjectApiService) { }

  ngOnInit(): void {
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
  
  openViewApiDialog(projectApi: Api) {
    this.projectApiSelected = projectApi;
    document.getElementById('viewProjectApiBtn')?.click();
  }

  openConfigApiDialog(projectApi: Api) {
    this.projectApiSelected = projectApi;
    if (projectApi.product === Product.chatbot.name) {
      document.getElementById('configChatbotApiBtn')?.click();
    }
  }
  
  openDeleteApiDialog(projectApi: Api) {
    this.projectApiSelected = projectApi;
    document.getElementById('deleteProjectApiBtn')?.click();
  }
}
