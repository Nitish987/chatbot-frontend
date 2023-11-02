import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const isAuthenticated = inject(AuthorizationService).isAuthenticated();
    if (!isAuthenticated) {
        inject(Router).navigateByUrl('/auth/login');
    }
    return of(isAuthenticated);
}
