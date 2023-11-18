import { Component, Input } from '@angular/core';
import { ProjectApi } from 'src/app/models/project-apis';
import { ProjectApiService } from '../../../../services/project-api/project-api.service';

@Component({
  selector: 'app-view-project-api',
  templateUrl: './view-project-api.component.html',
  styleUrls: ['./view-project-api.component.css'],
})
export class ViewProjectApiComponent {
  @Input() projectApi: ProjectApi | null = null;
  isCopied: boolean = false;

  constructor(private projectApiService: ProjectApiService) {}

  copyApiKey() {
    if (this.projectApi && !this.isCopied) {
      this.isCopied = true;
      this.projectApiService.viewApi(this.projectApi.project.id, this.projectApi.id).subscribe((res) => {
        if (res.success()) {
          navigator.clipboard.writeText(res.data()['apikey']);
        }
        setTimeout(() => {
          this.isCopied = false;
        }, 1000);
      });
    }
  }

  viewApi(closeBtn: HTMLButtonElement) {
    closeBtn.click();
  }
}
