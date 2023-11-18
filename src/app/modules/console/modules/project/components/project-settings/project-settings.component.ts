import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/modules/console/services/project/project.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {
  project: Project | null = null;
  projectFrom = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
    envtype: new FormControl('DEVELOPMENT', [Validators.required])
  });
  error: string | null = null;

  constructor(private projectService: ProjectService, private workingProjectService: WorkingProjectService) { }

  ngOnInit(): void {
    this.workingProjectService.getWorkingProjectId$.subscribe(id => {
      if (id !== null) {
        this.projectService.getProject(id).subscribe(project => {
          this.project = project;
          if (project) {
            this.projectFrom.setValue({
              name: project.name,
              description: project.description,
              envtype: project.envtype
            });
          }
        });
      } else {
        this.project = null;
      }
    });
  }

  onSubmit() {
    this.error = null;
    if (!this.projectFrom.controls.name.valid) {
      this.error = 'Name must have atleast 5 character and max to 50 characters.';
      return;
    }
    if (!this.projectFrom.controls.description.valid) {
      this.error = 'Description must have atleast 20 character and max to 200 characters.';
      return;
    }
    if (this.projectFrom.valid && this.project) {
      this.projectService.updateProject(this.project.id, {
        name: this.projectFrom.value.name!,
        description: this.projectFrom.value.description!,
        envtype: this.projectFrom.value.envtype!
      }).subscribe(res => {
        if (res.success()) {
          console.log('done');
        } else {
          this.error = res.error();
        }
      });
    }
  }
}
