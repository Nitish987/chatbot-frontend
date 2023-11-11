import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  projectFrom = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
    envtype: new FormControl('DEVELOPMENT', [Validators.required])
  });
  error: string | null = null;

  constructor(private projectService: ProjectService, private router: Router) { }

  onSubmit() {
    this.error = null;
    if (this.projectFrom.valid) {
      this.projectService.createProject({
        name: this.projectFrom.value.name!,
        description: this.projectFrom.value.description!,
        envtype: this.projectFrom.value.envtype!
      }).subscribe(res => {
        if (res.success()) {
          this.router.navigateByUrl(`/console/project/${res.data()['project']['id']}`);
        } else {
          this.error = res.error();
        }
      });
    }
  }
  
}
