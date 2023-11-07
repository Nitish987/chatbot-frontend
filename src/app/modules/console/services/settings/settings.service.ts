import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpService, private authorization: AuthorizationService) { }

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
}
