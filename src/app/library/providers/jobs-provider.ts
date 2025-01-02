import {HttpProvider} from '../../resources/core/provider-core';

export class JobsProvider extends HttpProvider {
  constructor() {
    super('jobs');
  }

  getJobs() {
    return this.get<any>('');
  }

  getJob(id: string) {
    return this.get<any>(`/${id}`);
  }
}
