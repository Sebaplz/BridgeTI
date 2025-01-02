import {Injectable} from '@angular/core';
import {JobsProvider} from '../providers/jobs-provider';

@Injectable({
  providedIn: 'root'
})
export class JobsRepository {
  private readonly jobsProvider = new JobsProvider();
  constructor() {}

  getJobs() {
    return this.jobsProvider.getJobs();
  }

  getJob(id: string) {
    return this.jobsProvider.getJob(id);
  }
}
