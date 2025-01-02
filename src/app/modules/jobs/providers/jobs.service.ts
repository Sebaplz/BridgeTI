import {JobsRepository} from '../../../library/repositories/jobs-repository';
import {inject} from '@angular/core';

export class JobsService {
  private readonly jobsRepository = inject(JobsRepository);
  constructor() {}

  getJobs() {
    return this.jobsRepository.getJobs();
  }

  getJob(id: string) {
    return this.jobsRepository.getJob(id);
  }
}
