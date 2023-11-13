import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private static products$ = new BehaviorSubject<Product[]>([]);
  private static products: Product[] = [];

  constructor(private http: HttpService) { }

  private setProducts(products: Product[]) {
    ProductService.products = products;
    ProductService.products$.next(ProductService.products);
  }

  get getProducts$() {
    return ProductService.products$;
  }

  loadProducts() {
    return this.http.get('/product/v1/products/').subscribe(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.setProducts(collector.data()['products']);
        }
        return collector;
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    });
  }
}
