import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private authorization: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.authorization.refreshAuthorizationToken().subscribe(result => {
      if (!result) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }
}
