import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ResponseCollector } from 'src/app/utils/response-collector';

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
  });
  error: string | null = null;
  success: string | null = null;

  constructor(private auth: AuthenticationService, private router: Router) { }

  nextFormIndex() {
    this.error = null;
    this.formIndex++;
  }

  onFormSubmit() {
    this.success = null;
    switch (this.formIndex) {
      case 0:
        if (!this.nameForm.controls.firstName.valid) {
          this.error = 'First name must be of 3 characters atleast.';
          return;
        }
        if (!this.nameForm.controls.lastName.valid) {
          this.error = 'Last name must be of 2 characters atleast.';
          return;
        }
        if (this.nameForm.value.firstName && this.nameForm.value.lastName) {
          this.nextFormIndex();
        }
      break;
      case 1:
        if (!this.detailForm.controls.email.valid) {
          this.error = 'Invalid email.';
          return;
        }
        if (!['M', 'F', 'O'].includes(this.detailForm.value.gender!)) {
          this.error = 'Gender must be specified';
          return;
        }
        if (this.detailForm.value.email && this.detailForm.value.gender) {
          this.nextFormIndex();
        }
      break;
      case 2:
        if(!this.passwordForm.valid) {
          this.error = 'Invalid password';
          return;
        }
        if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
          this.error = "Password doesn't match.";
          return;
        }
        if (this.passwordForm.value.password && this.passwordForm.value.confirmPassword && this.passwordForm.value.password === this.passwordForm.value.confirmPassword) {
          this.auth.signup({
            firstName: this.nameForm.value.firstName!,
            lastName: this.nameForm.value.lastName!,
            gender: this.detailForm.value.gender!,
            email: this.detailForm.value.email!,
            password: this.passwordForm.value.confirmPassword!
          }).subscribe(res => {
            try {
              const collector = new ResponseCollector(res);
              if (collector.success()) {
                this.nextFormIndex();
              } else {
                this.error = collector.error();
              }
            } catch(e) {
              this.error = 'Something went wrong.';
            }
          });
        }
      break;
      case 3:
        if (!this.verificationForm.valid) {
          this.error = 'OTP required. Must be of 6 digits.'
          return;
        }
        if (this.verificationForm.value.otp) {
          this.auth.signupVerification(this.verificationForm.value.otp).subscribe(res => {
            try {
              const collector = new ResponseCollector(res);
              if (collector.success()) {
                this.error = null;
                this.success = null;
                this.router.navigateByUrl('/console');
              } else {
                this.error = collector.error();
              }
            } catch(e) {
              this.error = 'Something went wrong.';
            }
          });
        }
      break;
    }
  }

  resentVerificationOtp() {
    this.error = null;
    this.auth.signupResentVerificionOtp().subscribe(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.success = 'OTP resent successfully.'
        } else {
          this.error = collector.error();
        }
      } catch(e) {
        this.error = 'Something went wrong.';
      }
    });
  }
}
