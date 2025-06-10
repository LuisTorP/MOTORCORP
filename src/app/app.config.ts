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
        projectId: 'motorcorp-55b78',
        appId: '1:310854174661:web:34c3d494d535b5bfc66dac',
        storageBucket: 'motorcorp-55b78.firebasestorage.app',
        apiKey: 'AIzaSyA-MKzjir3VXKBlA-1GfOTMlCQ0H7LYlRU',
        authDomain: 'motorcorp-55b78.firebaseapp.com',
        messagingSenderId: '310854174661',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
  ],
};
