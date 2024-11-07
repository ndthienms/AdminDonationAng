import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors  } from '@angular/common/http';
import { AuthInterceptor } from './Guards/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    // provideHttpClient(withFetch()),
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    provideHttpClient(withInterceptors([AuthInterceptor]), withFetch()),
  ]
};
