import {Component} from '@angular/core';
import {NavbarComponent} from '../../../../global/components/navbar/navbar.component';
import {FooterComponent} from '../../../../global/components/footer/footer.component';
import {BannerComponent} from '../../components/banner/banner.component';
import {ComunityComponent} from '../../components/comunity/comunity.component';
import {InfoComponent} from '../../components/info/info.component';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    ComunityComponent,
    InfoComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
