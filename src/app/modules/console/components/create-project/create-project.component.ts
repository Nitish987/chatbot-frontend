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
    envtype: new FormControl('DEVELOPMENT', [Validators.required]),
    host: new FormControl('', [Validators.required])
  });
  error: string | null = null;

  constructor(private projectService: ProjectService, private router: Router) { }

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
    if (!this.projectFrom.value.host!.startsWith('http')) {
      this.error = 'Please enter valid host url.';
      return;
    }
    if (this.projectFrom.valid) {
      this.projectService.createProject({
        name: this.projectFrom.value.name!,
        description: this.projectFrom.value.description!,
        envtype: this.projectFrom.value.envtype!,
        host: this.projectFrom.value.host!,
      }).subscribe(res => {
        if (res.success()) {
          this.router.navigateByUrl(`/console/project/${res.data()['project']['id']}/dashboard`);
        } else {
          this.error = res.error();
        }
      });
    }
  }
  
}
