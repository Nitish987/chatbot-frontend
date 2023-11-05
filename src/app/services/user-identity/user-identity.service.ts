import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpService } from '../http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {
  response$ = new BehaviorSubject<{isInitiated: boolean, message: string | null}>({isInitiated: false, message: null});
  dialogVisibility$ = new BehaviorSubject<boolean>(false);
  isVerification$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService) { }

  private setInitiated(isInitiated: boolean, message: string | null) {
    this.response$.next({isInitiated, message});
  }

  private setDialogVisibility(visibility: boolean) {
    this.dialogVisibility$.next(visibility);
  }

  private setVerified(isVerified: boolean) {
    this.isVerification$.next(isVerified);
  }

  private openDialog() {
    document.getElementById('userIdentityBtn')?.click();
    this.setDialogVisibility(true);
  }

  initiate() {
    this.openDialog();
    return this.http.post('/account/v1/user-identity/', {}).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.setInitiated(true, collector.data().message);
        } else {
          this.setInitiated(false, collector.error());
        }
      } catch(e) {
        this.setInitiated(false, 'Something went wrong.');
      }
    }));
  }

  verify(otp: string) {
    return this.http.post('/account/v1/user-identity-verify/', {otp}).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.setInitiated(true, collector.data().message);
          this.setVerified(true);
          this.setDialogVisibility(false);
        } else {
          this.setInitiated(false, collector.error());
        }
      } catch(e) {
        this.setInitiated(false, 'Something went wrong.');
      }
    }));
  }

  cancel() {
    this.setInitiated(false, null);
    this.setDialogVisibility(false);
    this.setVerified(false);
  }
}
