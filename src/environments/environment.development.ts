import {EnvironmentCore} from '../app/resources/core/environment-core';

export const environment: EnvironmentCore = {
  production: false,
  microservices: {
    "auth": 'http://localhost:5137/api/',
    "jobs": 'http://localhost:5137/api/'
  }
};
