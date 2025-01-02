import { Routes } from '@angular/router';
import {authGuard} from './global/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./modules/jobs/jobs.module').then(
        (m) => m.JobsModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
