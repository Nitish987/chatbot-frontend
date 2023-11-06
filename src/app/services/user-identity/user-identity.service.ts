import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {
  private static response$ = new BehaviorSubject<{isInitiated: boolean, message: string | null}>({isInitiated: false, message: null});
  private static dialogVisibility$ = new BehaviorSubject<boolean>(false);
  private static isVerified$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService) { }

  private setResponse(isInitiated: boolean, message: string | null) {
    UserIdentityService.response$.next({isInitiated, message});
  }

  getResponse() {
    return UserIdentityService.response$;
  }

  private setDialogVisibility(visibility: boolean) {
    UserIdentityService.dialogVisibility$.next(visibility);
  }

  getDialogVisibility() {
    return UserIdentityService.dialogVisibility$;
  }

  private setVerified(isVerified: boolean) {
    UserIdentityService.isVerified$.next(isVerified);
  }

  getVerified() {
    return UserIdentityService.isVerified$;
  }

  private openDialog() {
    document.getElementById('userIdentityBtn')?.click();
    this.setDialogVisibility(true);
  }

  private closeDialog() {
    document.getElementById('userIdentityCloseBtn')?.click();
    this.setDialogVisibility(false);
  }

  initiate() {
    this.openDialog();
    this.http.post('/account/v1/user-identity/', {}).subscribe(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.setResponse(true, collector.data().message);
        } else {
          this.setResponse(false, collector.error());
        }
      } catch(e) {
        this.setResponse(false, 'Something went wrong.');
      }
    });
  }

  verify(otp: string) {
    this.http.post('/account/v1/user-identity-verify/', {otp}).subscribe(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.setResponse(true, collector.data().message);
          this.setVerified(true);
          this.closeDialog();
        } else {
          this.setResponse(false, collector.error());
        }
      } catch(e) {
        this.setResponse(false, 'Something went wrong.');
      }
    });
  }

  cancel() {
    this.setResponse(false, null);
    this.setVerified(false);
    this.setDialogVisibility(false);
  }
}
