import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static user$ = new BehaviorSubject<User | null>(null);
  private static user: User | null = null;

  constructor(private authorization: AuthorizationService, private http: HttpService) { }

  private setUser(u: User) {
    UserService.user = u;
    UserService.user$.next(UserService.user);
  }

  loadUser() {
    if (UserService.user === null) {
      const userId = this.authorization.getUserId();
      this.http.get(`/account/v1/profile/${userId}/`).pipe(map(res => {
        try {
          return new ResponseCollector(res);
        } catch(e) {
          return ResponseCollector.localErrorResponse();
        }
      })).subscribe(res => {
        if (res.success()) {
          this.setUser(res.data());
        }
      });
    }
  }

  updateName(name: string) {
    if (UserService.user !== null) {
      this.setUser({ ...UserService.user, profile: {...UserService.user.profile, name: name }});
    }
  }

  updatePhoto(photo: string) {
    if (UserService.user !== null) {
      this.setUser({ ...UserService.user, profile: {...UserService.user.profile, photo: photo }});
    }
  }
}
