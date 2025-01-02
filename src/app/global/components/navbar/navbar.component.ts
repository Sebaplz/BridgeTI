import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {authAction} from '../../actions/auth.action';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly store = inject(Store);
  private readonly auth = this.store.select<any>(state => state.auth);
  protected readonly isLoggedIn = this.auth.pipe(map(auth => auth.isLoggedIn));
  protected readonly email = this.auth.pipe(map(auth => auth.email));
  protected readonly role = this.auth.pipe(map(auth => auth.role));

  constructor() {}

  logout() {
    this.store.dispatch(authAction.logout());
  }
}
