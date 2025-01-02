import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {JobsComponent} from './jobs.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/jobs-page/jobs-page.component')
            .then((c) => c.JobsPageComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/job-info/job-info.component')
            .then((c) => c.JobInfoComponent),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
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
export class JobsModule { }
