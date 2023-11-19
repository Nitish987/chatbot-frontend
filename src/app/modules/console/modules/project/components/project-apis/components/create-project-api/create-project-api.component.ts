import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectApiService } from '../../../../services/project-api/project-api.service';
import { Project } from 'src/app/models/project';
import { Product } from 'src/app/constants/products';

@Component({
  selector: 'app-create-project-api',
  templateUrl: './create-project-api.component.html',
  styleUrls: ['./create-project-api.component.css']
})
export class CreateProjectApiComponent {
  @Input() project: Project | null = null;
  apiForm = new FormGroup({
    product: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    host: new FormControl('', [Validators.required]),
  });
  error: string | null = null;
  product = Product;
  products = this.product.products;

  constructor(private projectApiService: ProjectApiService) {}

  createApi(closeBtn: HTMLButtonElement) {
    this.error = null;
    if (this.apiForm.value.product === '') {
      this.error = 'Please select the product you want to use.';
      return;
    }
    if (this.apiForm.value.type === '') {
      this.error = 'Please select the product type.';
      return;
    }
    if (!this.apiForm.value.host!.startsWith('http')) {
      this.error = 'Please enter valid host url.';
      return;
    }
    if (this.apiForm.valid && this.project) {
      this.projectApiService.createApi(this.project.id, this.apiForm.value.product!, this.apiForm.value.type!, this.apiForm.value.host!).subscribe(res => {
        if (res.success()) {
          closeBtn.click();
          this.resetForm();
        } else {
          this.error = res.error();
        }
      });
    }
  }

  onProductChange() {
    this.error = null;
    this.apiForm.controls.type.setValue('');
  }

  resetForm() {
    this.error = null;
    this.apiForm.setValue({
      product: '',
      type: '',
      host: ''
    });
  }
}
