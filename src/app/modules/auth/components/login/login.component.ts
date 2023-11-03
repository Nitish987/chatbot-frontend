import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseCollector } from 'src/app/utils/response-collector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentialForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error: string | null = null;
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  onFormSubmit() {
    if (!this.credentialForm.controls.email.valid) {
      this.error = 'Invalid Email.';
      return;
    }
    if (!this.credentialForm.controls.password.valid) {
      this.error = 'Invalid Password.';
      return;
    }
    if (this.credentialForm.value.email && this.credentialForm.value.password) {
      this.auth.login({
        email: this.credentialForm.value.email, 
        password: this.credentialForm.value.password
      }).subscribe(res => {
        try {
          const collector = new ResponseCollector(res);
          if (collector.success()) {
            this.error = null;
            this.router.navigateByUrl('/console');
          } else {
            this.error = collector.error();
          }
        } catch(e) {
          this.error = 'Something went wrong.';
        }
      });
    }
  }
}
