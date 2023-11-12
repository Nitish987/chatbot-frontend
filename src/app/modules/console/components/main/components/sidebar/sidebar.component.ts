import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  projectList: Project[] = [];

  constructor(private projectService: ProjectService) {
    ProjectService.projects$.subscribe(projects => {
      this.projectList = projects;
    })
  }

  ngOnInit(): void {
    this.projectService.listProject().subscribe(void 0);
  }
}
