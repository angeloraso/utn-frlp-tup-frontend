import { AuthService } from './auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <div class="login-container">
      @if (auth.user() === null) {
        <button class="google-btn" (click)="login()">
          <span>Iniciar sesión con Google</span>
        </button>
      } @else if (auth.user()) {
        <div class="user-profile">
          <img [src]="auth.user()?.photoURL" alt="Foto de perfil" class="avatar" />
          <p>Bienvenido, <strong>{{ auth.user()?.displayName }}</strong></p>
          <span class="email">{{ auth.user()?.email }}</span>
          <button class="logout-btn" (click)="logout()">Cerrar sesión</button>
        </div>
      } @else {
        <p>Verificando estado de la sesión...</p>
      }
    </div>
  `,
  styles: `
    .login-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; font-family: sans-serif; }
    .google-btn { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border: 1px solid #dadce0; border-radius: 4px; background-white: #fff; cursor: pointer; font-size: 14px; font-weight: 500; color: #3c4043; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .google-btn:hover { background-color: #f8f9fa; }
    .user-profile { text-align: center; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px; }
    .email { display: block; color: #666; margin-bottom: 20px; font-size: 14px; }
    .logout-btn { padding: 8px 16px; border: none; background-color: #ea4335; color: white; border-radius: 4px; cursor: pointer; }
  `
})
export class LoginComponent {
  auth = inject(AuthService);

  async login() {
    try {
      const result = await this.auth.loginWithGoogle();
      console.log('Usuario autenticado con éxito:', result.user);
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
    }
  }

  async logout() {
    try {
      await this.auth.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}