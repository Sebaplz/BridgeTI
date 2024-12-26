import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component')
        .then((c) => c.LoginPageComponent),
  },
  {
    path: 'register/student',
    loadComponent: () =>
      import('./pages/register-student-page/register-student-page.component')
        .then((c) => c.RegisterStudentPageComponent),
  },
  {
    path: 'register/company',
    loadComponent: () =>
      import('./pages/register-company-page/register-company-page.component')
        .then((c) => c.RegisterCompanyPageComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule {
}
