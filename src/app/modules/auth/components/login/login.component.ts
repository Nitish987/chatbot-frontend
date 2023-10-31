import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private auth: AuthService) {}

  onFormSubmit() {
    if (this.credentialForm.value.email && this.credentialForm.value.password) {
      this.auth.login({
        email: this.credentialForm.value.email, 
        password: this.credentialForm.value.password
      }).subscribe(res => {
        try {
          if (res.success) {
            console.log('AUTHENTICATED');
          }
        } catch(e) {
          console.log(e);
        }
      });
    }
  }
}
