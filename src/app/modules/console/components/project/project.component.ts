import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from '../../services/project/project.service';
import { WorkingProjectService } from '../../services/project/working-project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  tabActiveIndex = 0;
  project: Project | null = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private workingProject: WorkingProjectService) {
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
    const id = this.route.snapshot.paramMap.get('id')!;
    this.workingProject.changeWorkingProject(id);
  }

  changeTabIndex(idx: number) {
    this.tabActiveIndex = idx;
  }
}
