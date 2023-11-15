import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  projectList: Project[] = [];

  constructor(private projectService: ProjectService, private workingProject: WorkingProjectService) {
    projectService.getProjects$.subscribe(projects => {
      this.projectList = projects;
    })
  }

  onProjectChanged(project: Project) {
    this.workingProject.changeWorkingProject(project.id);
  }
}
