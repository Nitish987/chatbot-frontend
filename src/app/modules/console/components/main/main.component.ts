import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private authorization: AuthorizationService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const scheduler = interval(60000).subscribe(millis => {
      this.authorization.refreshAuthorizationToken().subscribe(result => {
        if (!result) {
          scheduler.unsubscribe();
          this.router.navigateByUrl('/auth/login');
        }
      });
    });
    this.userService.loadUser();
  }
}
