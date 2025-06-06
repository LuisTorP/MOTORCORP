import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'motocorp-11815',
        appId: '1:583109970694:web:5cb3e085822c3c62ad6c87',
        storageBucket: 'motocorp-11815.firebasestorage.app',
        apiKey: 'AIzaSyCVE4Qvhj39PhdMDwUMYYYD2aga54ZMl6s',
        authDomain: 'motocorp-11815.firebaseapp.com',
        messagingSenderId: '583109970694',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
  ],
};
