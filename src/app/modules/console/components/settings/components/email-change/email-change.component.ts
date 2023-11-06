import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/modules/console/services/settings/settings.service';

@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.component.html',
  styleUrls: ['./email-change.component.css']
})
export class EmailChangeComponent {
  formIndex = 0;
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  verificationForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)])
  })
  error: string | null = null;

  constructor(private settingsService: SettingsService) {}

  start() {
    switch(this.formIndex) {
      case 0: this.sendEmail(); break;
      case 1: this.verifyEmail(); break;
    }
  }

  sendEmail() {
    this.error = null;
    if (this.emailForm.valid) {
      this.settingsService.emailChange(this.emailForm.value.email!).subscribe(res => {
        if (res.success()) {
          this.formIndex++;
          this.emailForm.controls.email.setValue('');
        } else {
          this.error = res.error();
        }
      });
    } else {
      this.error = 'Invalid Email';
    }
  }

  verifyEmail() {
    this.error = null;
    if (this.verificationForm.valid) {
      this.settingsService.emailChangeVerification(this.verificationForm.value.otp!).subscribe(res => {
        if (res.success()) {
          this.formIndex++;
          this.verificationForm.controls.otp.setValue('');
        } else {
          this.error = res.error();
        }
      });
    } else {
      this.error = 'OTP required'
    }
  }

  onCancel() {
    this.emailForm.controls.email.setValue('');
    this.verificationForm.controls.otp.setValue('');
  }
}
 