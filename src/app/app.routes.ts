import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

const publicGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.user()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent)
      },
      {
        path: 'configuration',
        loadComponent: () => import('./configuration.component').then(m => m.ConfigurationComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];