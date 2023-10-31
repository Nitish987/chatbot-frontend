import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formIndex = 0;
  nameForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  detailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('Gender', [Validators.required])
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  verificationForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)])
  })

  constructor(private auth: AuthService, private router: Router) { }

  nextFormIndex() {
    this.formIndex++;
  }

  onFormSubmit() {
    switch (this.formIndex) {
      case 0:
        if (this.nameForm.value.firstName && this.nameForm.value.lastName) {
          this.nextFormIndex();
        }
      break;
      case 1:
        if (this.detailForm.value.email && this.detailForm.value.gender) {
          this.nextFormIndex();
        }
      break;
      case 2:
        if (this.passwordForm.value.password && this.passwordForm.value.confirmPassword && this.passwordForm.value.password === this.passwordForm.value.confirmPassword) {
          this.auth.signup({
            firstName: this.nameForm.value.firstName!,
            lastName: this.nameForm.value.lastName!,
            gender: this.detailForm.value.gender!,
            email: this.detailForm.value.email!,
            password: this.passwordForm.value.confirmPassword!
          }).subscribe(res => {
            try {
              if (res.success) {
                this.nextFormIndex();
              }
            } catch(e) {
              console.error(e);
            }
          });
        }
      break;
      case 3:
        if (this.verificationForm.value.otp) {
          this.auth.signupVerification(this.verificationForm.value.otp).subscribe(res => {
            try {
              if (res.success) {
                this.router.navigateByUrl('/auth/login');
              }
            } catch(e) {
              console.log(e);
            }
          });
        }
      break;
    }
  }
}
