import { Component } from '@angular/core';
import {NavbarComponent} from '../../global/components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../global/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent
  ]
})
export class DashboardComponent {}
