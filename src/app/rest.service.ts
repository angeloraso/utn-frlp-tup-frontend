import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  #http = inject(HttpClient);
  #apiUrl = 'https://utn-frlp-tup-api-rest.onrender.com/';

  getUserProfile(): Observable<UserProfile> {
    return this.#http.get<UserProfile>(`${this.#apiUrl}me`);
  }
}
