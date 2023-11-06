import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpService) { }

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
}
