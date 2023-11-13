import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/modules/console/services/product/product.service';
import { ProjectApiService } from '../../../../services/project-api/project-api.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-create-project-api',
  templateUrl: './create-project-api.component.html',
  styleUrls: ['./create-project-api.component.css']
})
export class CreateProjectApiComponent {
  @Input() project: Project | null = null;
  apiForm = new FormGroup({
    productId: new FormControl(0, [Validators.required]),
    host: new FormControl('', [Validators.required]),
  });
  error: string | null = null;
  products: Product[] = []

  constructor(private productService: ProductService, private projectApiService: ProjectApiService) {
    productService.getProducts$.subscribe(products => {
      this.products = products;
    });
  }

  createApi(closeBtn: HTMLButtonElement) {
    this.error = null;
    if (this.apiForm.value.productId === 0) {
      this.error = 'Please Select the product you want to use.';
      return;
    }
    if (!this.apiForm.value.host!.startsWith('http')) {
      this.error = 'Please enter valid host url.';
      return;
    }
    if (this.apiForm.valid) {
      console.log(this.project)
      this.projectApiService.createApi(this.project!.id, this.apiForm.value.productId!, this.apiForm.value.host!).subscribe(res => {
        if (res.success()) {
          closeBtn.click();
        } else {
          this.error = res.error();
        }
      });
    }
  }
}
