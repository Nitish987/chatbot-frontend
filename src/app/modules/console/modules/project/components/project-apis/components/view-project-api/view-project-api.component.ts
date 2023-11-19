import { Component, Input } from '@angular/core';
import { Api } from 'src/app/models/api';
import { ProjectApiService } from '../../../../services/project-api/project-api.service';
import { Product } from 'src/app/constants/products';

@Component({
  selector: 'app-view-project-api',
  templateUrl: './view-project-api.component.html',
  styleUrls: ['./view-project-api.component.css'],
})
export class ViewProjectApiComponent {
  @Input() projectApi: Api | null = null;
  isCopied: boolean = false;
  productTypes = Product.productTypes;

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
