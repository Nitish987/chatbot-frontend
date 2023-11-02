import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ResponseCollector } from 'src/app/utils/response-collector';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  signup({firstName, lastName, gender, email, password} : {firstName: string, lastName: string, gender: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.url}/account/v1/signup/`, {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      email: email,
      password: password,
      msg_token: ''
    }, {
      headers: {
        aak: environment.key
      },
      withCredentials: true
    }).pipe(map(res => {
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

  signupVerification(otp: string): Observable<any> {
    return this.http.post(`${environment.url}/account/v1/signup-verify/`, {
      otp: otp
    }, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    });
  }

  signupResentVerificionOtp(): Observable<any> {
    return this.http.post(`${environment.url}/account/v1/signup-resent-otp/`, {}, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    }); 
  }

  login({email, password}: {email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.url}/account/v1/login/`, {
      email, password, msg_token: ''
    }, {
      headers: {
        aak: environment.key,
      },
      withCredentials: true
    }).pipe(map(res => {
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
    return this.http.post(`${environment.url}/account/v1/recovery-password/`, { email }, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    }); 
  }

  recoverPasswordVerification(otp: string) {
    return this.http.post(`${environment.url}/account/v1/recovery-password-verify/`, { otp }, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    }); 
  }

  recoverNewPassword(password: string) {
    return this.http.post(`${environment.url}/account/v1/recovery-password-new/`, { password }, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    }); 
  }

  recoverPasswordResentVerificationOtp() {
    return this.http.post(`${environment.url}/account/v1/recovery-password-resent-otp/`, {}, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    }); 
  }
}
