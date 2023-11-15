import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { UserService } from 'src/app/services/auth/user.service';
import { ProductService } from '../../services/product/product.service';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private authorization: AuthorizationService, private router: Router, private userService: UserService, private productService: ProductService, private projectService: ProjectService) {}

  ngOnInit(): void {
    const scheduler = timer(0, 60000).subscribe(millis => {
      this.authorization.refreshAuthorizationToken().subscribe(result => {
        if (!result) {
          scheduler.unsubscribe();
          this.router.navigateByUrl('/auth/login');
        }
      });
    });
    this.authorization.canLoadData$.subscribe(canLoad => {
      if (canLoad) {
        this.userService.loadUser();
        this.productService.loadProducts();
        this.projectService.listProject().subscribe(void 0);
      }
    });
  }
}
