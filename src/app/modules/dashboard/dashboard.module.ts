import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'student',
        loadComponent: () =>
          import('./pages/dashboard-student/dashboard-student.component').then(
            (c) => c.DashboardStudentComponent
          ),
      },
      {
        path: 'company',
        loadComponent: () =>
          import('./pages/dashboard-company/dashboard-company.component').then(
            (c) => c.DashboardCompanyComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/dashboard-admin/dashboard-admin.component').then(
            (c) => c.DashboardAdminComponent
          ),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
