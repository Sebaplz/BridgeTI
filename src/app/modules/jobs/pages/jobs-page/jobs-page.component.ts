import {Component, inject, OnInit} from '@angular/core';
import {JobsService} from '../../providers/jobs.service';
import {TagModule} from 'primeng/tag';
import {Button, ButtonDirective} from 'primeng/button';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Internship} from '../../../../resources/io/jobs/jobs.out';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [
    TagModule,
    Button,
    DatePipe,
    DataViewModule,
    NgClass,
    NgForOf,
    ButtonDirective,
    DividerModule,
    DropdownModule,
    FormsModule
  ],
  providers: [JobsService],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.scss'
})
export class JobsPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly jobsService = inject(JobsService);
  jobs: Internship[] = [];
  sortOptionsLocation!: SelectItem[];
  sortFieldLocation!: string;
  sortOptionsDate!: SelectItem[];
  sortFieldDate!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe({
      next: (response): void => {
        this.jobs = response.data as Internship[];
        console.log(this.jobs);
      },
      error: (err) => {
        console.error('Error al obtener los jobs:', err);
      }
    });

    this.sortOptionsLocation = [
      { label: 'Ubicación (A-Z)', value: 'location' },
      { label: 'Ubicación (Z-A)', value: '!location' }
    ];
    this.sortOptionsDate = [
      { label: 'Fecha de publicación (más reciente)', value: '!createdAt' },
      { label: 'Fecha de publicación (menos reciente)', value: 'createdAt' }
    ];
  }

  getDaysAgo(date: string): string {
    const diff = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === -1) {
      return 'Hace menos de un día';
    } else if (days === 0) {
      return 'Hoy';
    } else {
      return 'Hace ' + days + ' días';
    }
  }

  onSortChangeLocation(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.jobs.sort((a, b) => b.location.localeCompare(a.location));
    } else {
      this.jobs.sort((a, b) => a.location.localeCompare(b.location));
    }
  }

  onSortChangeDate(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      this.jobs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  }

  onClick(job: Internship) {
    this.router.navigate(['/jobs', job.internshipId]);
  }
}
