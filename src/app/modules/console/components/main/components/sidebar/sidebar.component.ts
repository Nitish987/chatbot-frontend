import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  projectList: Project[] = [];
  currentProjectId: string | null = null;

  constructor(private projectService: ProjectService, private workingProject: WorkingProjectService, private router: Router) {
    projectService.getProjects$.subscribe(projects => {
      this.projectList = projects;
    });
  }

  ngOnInit(): void {
    this.workingProject.getWorkingProjectId$.subscribe(id => {
      this.currentProjectId = id;
    });
  }

  onProjectChanged(project: Project) {
    this.workingProject.changeWorkingProject(project.id);
  }

  onProjectChangedToNull() {
    this.workingProject.changeWorkingProject(null);
  }
}
