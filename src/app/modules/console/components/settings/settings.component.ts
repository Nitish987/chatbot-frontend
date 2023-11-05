import { Component } from '@angular/core';
import { UserIdentityService } from 'src/app/services/user-identity/user-identity.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private identityService: UserIdentityService) { }

  iWantToChangeMyEmail() {
    this.identityService.initiate().subscribe(void 0);
  }
}
