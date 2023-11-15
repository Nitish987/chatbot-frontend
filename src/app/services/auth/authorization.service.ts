import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ResponseCollector } from 'src/app/utils/response-collector';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private USER_ID = 'uid';
  private AUTH_TOKEN = 'at';
  // state use for allowing data to be load from the server
  private static allowLoadData$ = new BehaviorSubject<boolean>(false);
  private static allowLoadData = false;


  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this.getUserId() !== null && this.getUserId() !== undefined && this.getAuthorizationToken() !== null && this.getAuthorizationToken() !== undefined;
  }

  setAllowLoadData(canLoad: boolean) {
    // if previous state is same as current state then do nothing else change the state
    if (AuthorizationService.allowLoadData !== canLoad) {
      AuthorizationService.allowLoadData = canLoad;
      AuthorizationService.allowLoadData$.next(AuthorizationService.allowLoadData);
    }
  }

  get canLoadData$() {
    return AuthorizationService.allowLoadData$;
  }

  saveClientAuthData(data: {uid: string, at: string}) {
    localStorage.setItem(this.USER_ID, data.uid);
    localStorage.setItem(this.AUTH_TOKEN, data.at);
    this.setAllowLoadData(true);
  }

  getUserId() {
    return localStorage.getItem(this.USER_ID);
  }

  getAuthorizationToken() {
    return localStorage.getItem(this.AUTH_TOKEN);
  }

  updateAuthorizationToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN, token);
  }

  deleteClientAuthData() {
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.AUTH_TOKEN);
    this.setAllowLoadData(false);
  }

  refreshAuthorizationToken() {
    const url = environment.url + '/account/v1/refresh-token/'
    return this.http.get(url, {
      withCredentials: true
    }).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.saveClientAuthData(collector.data())
          return true;
        }
        this.deleteClientAuthData();
        return false;
      } catch(e) {
        return false;
      }
    }));
  }
}
