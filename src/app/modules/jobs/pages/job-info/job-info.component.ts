import { Component, inject, OnInit } from '@angular/core';
import { JobsService } from '../../providers/jobs.service';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import { Internship } from '../../../../resources/io/jobs/jobs.out';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-job-info',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    ButtonDirective
  ],
  providers: [JobsService],
  templateUrl: './job-info.component.html',
  styleUrl: './job-info.component.scss'
})
export class JobInfoComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly jobsService: JobsService = inject(JobsService);
  job: Internship | null = null;

  constructor() { }

  ngOnInit(): void {
    // Obtener el id de la ruta
    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      this.jobsService.getJob(id).subscribe((job: Internship) => {
        this.job = job;
        console.log(this.job);
      });
    });
  }
}
