import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthStore} from '../../resources/stores/auth.store';
import {map, take} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(Store<{ auth: AuthStore }>);
  const router = inject(Router);

  const ADMIN = 'ADMIN';
  const STUDENT = 'STUDENT';
  const COMPANY = 'COMPANY';

  return authStore.select(state => state.auth).pipe(
    take(1),
    map(auth => {
      const {isLoggedIn, role} = auth;
      if (isLoggedIn && role === ADMIN) {
        router.navigate(['/dashboard/admin']);
        return false;
      } else if (isLoggedIn && role === STUDENT) {
        router.navigate(['/dashboard/student']);
        return false;
      } else if (isLoggedIn && role === COMPANY) {
        router.navigate(['/dashboard/company']);
        return false;
      } else if (isLoggedIn) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
