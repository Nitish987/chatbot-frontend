import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { UserService } from 'src/app/services/auth/user.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpService, private authorization: AuthorizationService, private userService: UserService) { }

  emailChange(email: string) {
    return this.http.post('/account/v1/account-email-change/', {email}).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  emailChangeVerification(otp: string) {
    return this.http.post('/account/v1/account-email-change-verify/', {otp}).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  changePassword({currentPassword, newPassword}: {currentPassword: string, newPassword: string}) {
    return this.http.post('/account/v1/account-password-change/',{
      password: currentPassword,
      new_password: newPassword
    }).pipe(map(res => {
      try {
        this.authorization.deleteClientAuthData();
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  changeName({firstName, lastName}: {firstName: string, lastName: string}) {
    return this.http.post('/account/v1/account-name-change/', {
      first_name: firstName,
      last_name: lastName
    }).pipe(map(res => {
      try {
        this.userService.updateName(firstName + ' ' + lastName);
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  changeProfilePic(file: File) {
    const data = new FormData();
    data.append('photo', file);
    const userId = this.authorization.getUserId();
    return this.http.put(`/account/v1/profile/${userId}/photo-update/`, data).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.userService.updatePhoto(collector.data()['photo']);
        }
        return collector;
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }
}
