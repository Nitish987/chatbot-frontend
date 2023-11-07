import { Component } from '@angular/core';
import { SettingsService } from 'src/app/modules/console/services/settings/settings.service';

@Component({
  selector: 'app-profile-pic-change',
  templateUrl: './profile-pic-change.component.html',
  styleUrls: ['./profile-pic-change.component.css']
})
export class ProfilePicChangeComponent {
  error: string | null = null;

  constructor(private settingsService: SettingsService) { }

  changePic(input: HTMLInputElement, closeBtn: HTMLButtonElement) {
    this.error = null;
    if (input.files === null) {
      this.error = 'No Photo Picked.'
    } 
    this.settingsService.changeProfilePic(input.files![0]).subscribe(res => {
      if (res.success()) {
        closeBtn.click();
      } else {
        this.error = res.error();
      }
    });
  }
}
