import { Component, Input } from '@angular/core';
import { ProjectApi } from 'src/app/models/project-apis';
import { ProjectApiService } from '../../../../services/project-api/project-api.service';

@Component({
  selector: 'app-delete-project-api',
  templateUrl: './delete-project-api.component.html',
  styleUrls: ['./delete-project-api.component.css']
})
export class DeleteProjectApiComponent {
  @Input() projectApi: ProjectApi | null = null;

  constructor(private projectApiService: ProjectApiService) {}

  deleteApi(closeBtn: HTMLButtonElement) {
    if (this.projectApi) {
      this.projectApiService.deleteApi(this.projectApi.project.id, this.projectApi.id).subscribe(res => {
        if (res.success()) {
          closeBtn.click();
        }
      });
    }
  }
}
