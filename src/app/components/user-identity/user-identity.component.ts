import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserIdentityService } from 'src/app/services/user-identity/user-identity.service';

@Component({
  selector: 'app-user-identity',
  templateUrl: './user-identity.component.html',
  styleUrls: ['./user-identity.component.css']
})
export class UserIdentityComponent {
  verificationForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.maxLength(6)])
  });

  error: string | null = null

  constructor(private service: UserIdentityService) {
    this.service.getResponse$.subscribe(result => {
      if (!result.isInitiated) {
        this.error = result.message;
      }
    });
  }

  verifyIdentity() {
    this.error = null;
    if (this.verificationForm.valid) {
      this.service.verify(this.verificationForm.value.otp!);
      this.verificationForm.controls.otp.setValue('');
    } else {
      this.error = 'OTP required'
    }
  }

  cancelService() {
    this.service.cancel();
    this.verificationForm.controls.otp.setValue('');
  }
}
