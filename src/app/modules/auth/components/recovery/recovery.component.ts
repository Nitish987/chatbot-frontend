import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ResponseCollector } from 'src/app/utils/response-collector';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  formIndex = 0;
  detailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  verificationForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)])
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  error: string | null = null;
  success: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  nextFormIndex() {
    this.error = null;
    this.formIndex++;
  }

  onFormSubmit() {
    this.success = null;
    switch (this.formIndex) {
      case 0:
        if (!this.detailForm.controls.email.valid) {
          this.error = 'Invalid email.';
          return;
        }
        if (this.detailForm.value.email) {
          this.auth.recoverPassword(this.detailForm.value.email).subscribe(res => {
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
      case 1:
        if (!this.verificationForm.valid) {
          this.error = 'OTP required. Must be of 6 digits.'
          return;
        }
        if (this.verificationForm.value.otp) {
          this.auth.recoverPasswordVerification(this.verificationForm.value.otp).subscribe(res => {
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
          this.auth.recoverNewPassword(this.passwordForm.value.confirmPassword).subscribe(res => {
            try {
              const collector = new ResponseCollector(res);
              if (collector.success()) {
                this.nextFormIndex();
                this.success = 'Password Changed Successfully.'
                timer(2000).subscribe(_ => {
                  this.router.navigateByUrl('/auth/login');
                });
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
    this.auth.recoverPasswordResentVerificationOtp().subscribe(res => {
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
