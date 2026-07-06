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
  role = signal<'professor' | 'student' | null>(null);

  constructor() {
    onAuthStateChanged(this.#auth, async (user) => {
      this.user.set(user);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const role = tokenResult.claims['role'] as 'professor' | 'student';
        this.role.set(role || 'student');
      } else {
        this.role.set(null);
      }
    });
  }

  async refreshUserTokenAndRole() {
    const user = this.#auth.currentUser;
    if (user) {
      const tokenResult = await user.getIdTokenResult(true); 
      const newRole = tokenResult.claims['role'] as 'professor' | 'student';
      this.role.set(newRole || 'student');
    }
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