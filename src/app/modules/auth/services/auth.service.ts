import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
    });
  }

  signupVerification(otp: string): Observable<any> {
    return this.http.post(`${environment.url}/account/v1/signup/verify/`, {
      otp: otp
    }, {
      headers: {
        aak: environment.key,
        ack: environment.ack
      },
      withCredentials: true
    });
  }

  // signupResentVerificionOtp(): Observable<any> {
  //   return 
  // }

  login({email, password}: {email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.url}/account/v1/login/`, {
      email, password, msg_token: ''
    }, {
      headers: {
        aak: environment.key,
      },
      withCredentials: true
    });
  }
}
