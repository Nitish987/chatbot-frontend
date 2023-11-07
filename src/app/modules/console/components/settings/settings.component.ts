import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserIdentityService } from 'src/app/services/user-identity/user-identity.service';
import { SettingsService } from '../../services/settings/settings.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { Profile } from 'src/app/models/profile';
import { UserService } from 'src/app/services/auth/user.service';

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
  passwordFromError: string | null = null;
  passwordFromsuccess: string | null = null;
  profile: Profile | null = null;
  nameForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  })

  constructor(private identityService: UserIdentityService, private settingsService: SettingsService, private router: Router, private authorizationService: AuthorizationService) {
    this.identityService.getVerified().subscribe(isVerified => {
      if (isVerified) {
        this.identityService.cancel();
        document.getElementById("emailChangeBtn")?.click();
      }
    });
    UserService.user$.subscribe(user => {
      if (user !== null) {
        this.profile = user.profile;
        const fullName = this.profile.name.split(' ');
        this.nameForm.setValue({
          firstName: fullName[0],
          lastName: fullName[1]
        })
      }
    });
  }

  iWantToChangeMyEmail() {
    this.identityService.initiate();
  }

  changePassword() {
    this.passwordFromError = null;
    this.passwordFromsuccess = null;
    if (!this.passwordForm.valid) {
      this.passwordFromError = "Password fields are empty."
      return;
    }
    if (this.passwordForm.value.newPass !== this.passwordForm.value.confirmNewPass) {
      this.passwordFromError = "Password doesn't match."
      return;
    }

    this.settingsService.changePassword({
      currentPassword: this.passwordForm.value.currentPass!,
      newPassword: this.passwordForm.value.confirmNewPass!
    }).subscribe(res => {
      if (res.success()) {
        this.passwordFromsuccess = res.data()['message'];
        timer(2000).subscribe(millis => {
          this.router.navigateByUrl('/auth/login');
        });
      } else {
        this.passwordFromError = res.error();
      }
    });
  }

  onForgetPassword() {
    this.authorizationService.deleteClientAuthData();
    this.router.navigateByUrl('/auth/recovery');
  }
}
