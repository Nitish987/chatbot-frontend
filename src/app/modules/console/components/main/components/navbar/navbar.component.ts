import { Component } from '@angular/core';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private workingProject: WorkingProjectService) {}

  onProjectChangedToNull() {
    this.workingProject.changeWorkingProject(null);
  }
}
