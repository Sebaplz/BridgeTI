import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
