import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';
import { WorkingProjectService } from '../../services/project/working-project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  projectList: Project[] = [];

  constructor(private projectService: ProjectService, private workingProject: WorkingProjectService, private router: Router) {
    projectService.getProjects$.subscribe(projects => {
      this.projectList = projects;
    });
  }

  navigateToProject(projectId: string) {
    this.workingProject.changeWorkingProject(projectId);
    this.router.navigateByUrl(`/console/project/${projectId}/dashboard`);
  }
}
