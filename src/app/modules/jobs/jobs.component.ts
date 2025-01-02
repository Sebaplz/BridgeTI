import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../global/components/footer/footer.component';
import {NavbarComponent} from '../../global/components/navbar/navbar.component';

@Component({
  selector: 'app-jobs',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent]
})

export class JobsComponent { }
