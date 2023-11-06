import { Component } from '@angular/core';
import { UserIdentityService } from 'src/app/services/user-identity/user-identity.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private identityService: UserIdentityService) {
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
}
