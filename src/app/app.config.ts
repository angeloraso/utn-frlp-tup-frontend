import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDYx-1C_jl83vCCGBIA9n8yPISHMWvQnf4",
  authDomain: "angular-utn-frlp.firebaseapp.com",
  projectId: "angular-utn-frlp",
  storageBucket: "angular-utn-frlp.firebasestorage.app",
  messagingSenderId: "295111462330",
  appId: "1:295111462330:web:108892c7896f0ded4fa183"
};

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);

export const FIREBASE_AUTH = new InjectionToken<Auth>('FirebaseAuth', {
  providedIn: 'root',
  factory: () => authInstance
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient()]
};
