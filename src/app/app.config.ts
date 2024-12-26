import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {authReducer} from './modules/authentication/core/reducers/auth.reducer';
import {provideEffects} from '@ngrx/effects';
import {AuthEffect} from './library/effects/auth.effect';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {ConfirmationService, MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      auth: authReducer,
    }),
    provideEffects([
      AuthEffect
    ]),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([])
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true,
      autoPause: true,
      traceLimit: 75,
    }),
    MessageService,
    ConfirmationService,
  ]
};
