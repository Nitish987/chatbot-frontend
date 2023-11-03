import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private USER_ID = 'uid';
  private AUTH_TOKEN = 'at';

  constructor() { }

  isAuthenticated(): boolean {
    return this.getUserId() !== null && this.getAuthorizationToken() !== null;
  }

  saveClientAuthData(data: {uid: string, at: string}) {
    localStorage.setItem(this.USER_ID, data.uid);
    localStorage.setItem(this.AUTH_TOKEN, data.at);
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

  refreshAuthorizationToken() {
    
  }
}
