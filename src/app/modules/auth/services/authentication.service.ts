import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpService, private authorizationService: AuthorizationService) { }

  signup({firstName, lastName, gender, email, password} : {firstName: string, lastName: string, gender: string, email: string, password: string}): Observable<any> {
    return this.http.post('/account/v1/signup/', {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      email: email,
      password: password,
      msg_token: ''
    }, false);
  }

  signupVerification(otp: string): Observable<any> {
    return this.http.post('/account/v1/signup-verify/', {otp: otp}, false).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.authorizationService.saveClientAuthData(collector.data());
        }
        return res;
      } catch(e) {
        return res;
      }
    }));
  }

  signupResentVerificionOtp(): Observable<any> {
    return this.http.post('/account/v1/signup-resent-otp/', {}, false); 
  }

  login({email, password}: {email: string, password: string}): Observable<any> {
    return this.http.post('/account/v1/login/', {
      email, password, msg_token: ''
    }, false).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.authorizationService.saveClientAuthData(collector.data());
        }
        return res;
      } catch(e) {
        return res;
      }
    }));
  }

  recoverPassword(email: string) {
    return this.http.post('/account/v1/recovery-password/', { email }, false); 
  }

  recoverPasswordVerification(otp: string) {
    return this.http.post('/account/v1/recovery-password-verify/', { otp }, false); 
  }

  recoverNewPassword(password: string) {
    return this.http.post('/account/v1/recovery-password-new/', { password }, false); 
  }

  recoverPasswordResentVerificationOtp() {
    return this.http.post('/account/v1/recovery-password-resent-otp/', {}, false); 
  }
}
