import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-comunity',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './comunity.component.html',
  styleUrl: './comunity.component.scss'
})
export class ComunityComponent {

}
