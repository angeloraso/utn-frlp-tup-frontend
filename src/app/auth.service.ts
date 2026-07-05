// services/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { 
  signOut, 
  onAuthStateChanged, 
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { FIREBASE_AUTH } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #auth = inject(FIREBASE_AUTH);

  user = signal<User | null | undefined>(undefined);

  constructor() {
    onAuthStateChanged(this.#auth, (user) => {
      this.user.set(user);
    });
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    return signInWithPopup(this.#auth, provider);
  }

  logout() {
    return signOut(this.#auth);
  }
}