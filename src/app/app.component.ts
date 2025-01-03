import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthStore} from './resources/stores/auth.store';
import {authAction} from './global/actions/auth.action';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
  `,
})
export class AppComponent implements OnInit {
  authStore = inject(Store<{ auth: AuthStore }>);
  router = inject(Router);

  ngOnInit() {
    this.authStore.dispatch(authAction.loadToken());
    this.authStore.select(state => state.auth).subscribe(auth => {
      if (auth.checked && auth.isLoggedIn) {
        const currentUrl = this.router.url; // Obtén la URL actual
        if (currentUrl !== '/') {
          this.router.navigate(['/']);
        }
      }
    });
  }
}
