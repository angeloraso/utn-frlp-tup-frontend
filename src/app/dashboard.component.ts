import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <div class="brand">
          <h2>UTN FRLP TUP 2026</h2>
        </div>
        <nav class="nav-links">
          <a routerLink="/dashboard/home" routerLinkActive="active">Inicio</a>
          <a routerLink="/dashboard/configuration" routerLinkActive="active">Configuración</a>
        </nav>
        
        @if (auth.user(); as user) {
          <div class="user-profile-summary">
            <img [src]="user.photoURL" alt="Avatar" class="mini-avatar" />
            <div class="user-info">
              <span class="user-name">{{ user.displayName }}</span>
              <span class="user-email">{{ user.email }}</span>
            </div>
            <button class="logout-icon-btn" (click)="logout()">🚪</button>
          </div>
        }
      </aside>

      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    :host { display: block; height: 100vh; background-color: #f3f4f6; font-family: sans-serif; }
    .dashboard-layout { display: flex; height: 100%; }
    .sidebar { width: 260px; background-color: #1f2937; color: white; display: flex; flex-direction: column; padding: 24px 16px; justify-content: space-between; }
    .nav-links { display: flex; flex-direction: column; gap: 8px; flex-grow: 1; }
    .nav-links a { color: #9ca3af; text-decoration: none; padding: 10px 12px; border-radius: 6px; font-size: 14px; }
    .nav-links a.active { background-color: #374151; color: white; }
    .main-content { flex-grow: 1; padding: 40px; overflow-y: auto; }
    :host {
      display: block;
      height: 100vh;
      background-color: #f3f4f6;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .dashboard-layout {
      display: flex;
      height: 100%;
    }
    
    .sidebar {
      width: 260px;
      background-color: #1f2937;
      color: white;
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
      justify-content: space-between;
    }
    .brand h2 {
      margin: 0 0 32px 0;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #60a5fa;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-grow: 1;
    }
    .nav-links a {
      color: #9ca3af;
      text-decoration: none;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 14px;
      transition: all 0.2s;
    }
    .nav-links a:hover, .nav-links a.active {
      background-color: #374151;
      color: white;
    }

    .user-profile-summary {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 16px;
      border-top: 1px solid #374151;
    }
    .mini-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #3b82f6;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      flex-grow: 1;
    }
    .user-name {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .user-email {
      font-size: 11px;
      color: #9ca3af;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `
})
export class DashboardComponent {
  auth = inject(AuthService);
  async logout() { await this.auth.logout(); }
}