import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  project: Project | null = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private workingProject: WorkingProjectService, private authorizationService: AuthorizationService) {
    workingProject.getWorkingProjectId$.subscribe(id => {
      if (id !== null) {
        this.projectService.getProject(id).subscribe(project => {
          this.project = project;
        });
      } else {
        this.project = null;
      }
    })
  }

  ngOnInit(): void {
    this.authorizationService.canLoadData$.subscribe(canLoad => {
      if (canLoad) {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.workingProject.changeWorkingProject(id);
      }
    });
  }
}
