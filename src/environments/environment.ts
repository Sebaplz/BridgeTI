import {EnvironmentCore} from '../app/resources/core/environment-core';

export const environment: EnvironmentCore = {
  production: true,
  microservices: {
    "auth": 'http://localhost:5137/api/'
  }
};
