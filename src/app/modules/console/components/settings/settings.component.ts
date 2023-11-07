import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserIdentityService } from 'src/app/services/user-identity/user-identity.service';
import { SettingsService } from '../../services/settings/settings.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  passwordForm = new FormGroup({
    currentPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confirmNewPass: new FormControl('', [Validators.required])
  });
  error: string | null = null;
  success: string | null = null;

  constructor(private identityService: UserIdentityService, private settingsService: SettingsService, private router: Router, private authorizationService: AuthorizationService) {
    this.identityService.getVerified().subscribe(isVerified => {
      if (isVerified) {
        this.identityService.cancel();
        document.getElementById("emailChangeBtn")?.click();
      }
    });
  }

  iWantToChangeMyEmail() {
    this.identityService.initiate();
  }

  changePassword() {
    this.error = null;
    this.success = null;
    if (!this.passwordForm.valid) {
      this.error = "Password fields are empty."
      return;
    }
    if (this.passwordForm.value.newPass !== this.passwordForm.value.confirmNewPass) {
      this.error = "Password doesn't match."
      return;
    }

    this.settingsService.changePassword({
      currentPassword: this.passwordForm.value.currentPass!,
      newPassword: this.passwordForm.value.confirmNewPass!
    }).subscribe(res => {
      if (res.success()) {
        this.success = res.data()['message'];
        timer(2000).subscribe(millis => {
          this.router.navigateByUrl('/auth/login');
        });
      } else {
        this.error = res.error();
      }
    });
  }

  onForgetPassword() {
    this.authorizationService.deleteClientAuthData();
    this.router.navigateByUrl('/auth/recovery');
  }
}
