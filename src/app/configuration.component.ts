import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="settings-container">
      <h2>Configuración de Cuenta</h2>
      <p class="subtitle">
        Gestiona y visualiza el estado actual de tus credenciales sincronizadas
        con la API.
      </p>

      @if (loading()) {
        <div class="loading-state">
          <p>Obteniendo información desde el servidor externo...</p>
        </div>
      }

      @if (errorMessage()) {
        <div class="error-card">
          <p>⚠️ {{ errorMessage() }}</p>
          <button (click)="fetchUserData()">Reintentar conexión</button>
        </div>
      }

      @if (!loading() && !errorMessage() && apiUserData()) {
        @let apiUser = apiUserData();
        @let fbUser = auth.user();

        <div class="profile-card">
          <div class="card-header">
            <img
              [src]="fbUser?.photoURL || 'https://placeholder.co/150'"
              alt="Avatar"
              class="profile-avatar"
            />
            <div class="header-text">
              <h3>{{ apiUser?.name || fbUser?.displayName }}</h3>
              <span class="badge">{{
                apiUser?.role || 'Sin rol especificado'
              }}</span>
            </div>
          </div>

          <div class="card-body">
            <div class="info-row">
              <span class="label">Correo Electrónico:</span>
              <span class="value">{{ apiUser?.email || fbUser?.email }}</span>
            </div>
            @if (apiUser?.createdAt) {
              <div class="info-row">
                <span class="label">Miembro desde:</span>
                <span class="value">{{
                  apiUser?.createdAt | date: 'dd/MM/yyyy'
                }}</span>
              </div>
            }
          </div>

          <div class="card-footer">
            <small>Sincronizado vía UTN FRLP TUP API REST</small>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .settings-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      font-family: system-ui, sans-serif;
    }
    h2 {
      color: #111827;
      margin-bottom: 4px;
      font-size: 24px;
    }
    .subtitle {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 24px;
    }

    .loading-state {
      padding: 40px;
      text-align: center;
      color: #4b5563;
    }

    .error-card {
      background-color: #fef2f2;
      border: 1px solid #fee2e2;
      color: #991b1b;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .error-card button {
      background-color: #dc2626;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 8px;
    }

    /* Perfil Estilo Tarjeta */
    .profile-card {
      background: white;
      border-radius: 12px;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid #e5e7eb;
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      border-bottom: 1px solid #e5e7eb;
    }
    .profile-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header-text h3 {
      margin: 0 0 4px 0;
      font-size: 18px;
      color: #111827;
    }
    .badge {
      background-color: #dbeafe;
      color: #1e40af;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      text-transform: uppercase;
    }

    .card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #f3f4f6;
      padding-bottom: 12px;
      font-size: 14px;
    }
    .info-row:last-child {
      border: none;
      padding-bottom: 0;
    }
    .label {
      color: #6b7280;
      font-weight: 500;
    }
    .value {
      color: #111827;
      font-weight: 600;
    }
    .code {
      font-family: monospace;
      background-color: #f3f4f6;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
    }

    .card-footer {
      background-color: #f9fafb;
      padding: 12px 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
      color: #9ca3af;
      font-size: 11px;
    }
  `,
})
export class ConfiguracionComponent implements OnInit {
  private http = inject(HttpClient);
  auth = inject(AuthService);

  apiUserData = signal<UserProfile | null>(null);
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  private apiUrl = 'https://utn-frlp-tup-api-rest.onrender.com/me';

  ngOnInit(): void {
    this.fetchUserData();
  }

  async fetchUserData() {
    this.loading.set(true);
    this.errorMessage.set(null);

    const currentUser = this.auth.user();

    if (!currentUser) {
      this.errorMessage.set('No hay un usuario autenticado en Firebase.');
      this.loading.set(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<UserProfile>(this.apiUrl, { headers }).subscribe({
        next: (data) => {
          this.apiUserData.set(data);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error en la API:', error);
          this.errorMessage.set('Error en el servidor externo.');
          this.loading.set(false);
        },
      });
    } catch (error) {
      console.error('Error al obtener el token de Firebase:', error);
      this.errorMessage.set('No se pudo generar el token de seguridad.');
      this.loading.set(false);
    }
  }
}
