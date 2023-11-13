import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Project } from 'src/app/models/project';
import { ProductService } from 'src/app/modules/console/services/product/product.service';

@Component({
  selector: 'app-project-apis',
  templateUrl: './project-apis.component.html',
  styleUrls: ['./project-apis.component.css']
})
export class ProjectApisComponent {
  @Input() project: Project | null = null;
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getProducts$.subscribe(products => {
      this.products = products;
    });
  }

  
}
