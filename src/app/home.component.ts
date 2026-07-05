// components/inicio-content/inicio-content.component.ts
import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <header class="top-header">
      @if (auth.user(); as user) {
        <h1>¡Hola de nuevo, {{ user.displayName }}! 👋</h1>
      }
      <div class="date-tag">Panel de Control</div>
    </header>

    <section class="dashboard-grid">
      <div class="card">
        <h3>Estado de cuenta</h3>
        <p class="card-value">Activa</p>
        <span class="card-sub">Verificado vía Google Auth</span>
      </div>
      <div class="card">
        <h3>Último ingreso</h3>
        <p class="card-value text-small">Hoy</p>
        <span class="card-sub">Sesión segura</span>
      </div>
    </section>
  `,
  styles: `
    .top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .top-header h1 { margin: 0; font-size: 28px; color: #111827; font-weight: 700; }
    .date-tag { background-color: #e5e7eb; padding: 6px 12px; border-radius: 20px; font-size: 12px; color: #4b5563; }
    .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .card h3 { margin: 0 0 12px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; }
    .card-value { font-size: 32px; font-weight: 700; color: #10b981; margin: 0; }
    .text-small { color: #111827; }
    .card-sub { font-size: 12px; color: #9ca3af; }
  `
})
export class HomeComponent {
  auth = inject(AuthService);
}