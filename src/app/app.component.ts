// app.component.ts
import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  auth = inject(AuthService);
  #router = inject(Router);

  constructor() {
    effect(() => {
        const user = this.auth.user();
        if (user === undefined) {
          return;
        }

        if (user) {
          if (this.#router.url.includes('/login')) {
            this.#router.navigate(['/dashboard']);
          }

          return;
        }

        this.#router.navigate(['/login']);
      });
  }
}