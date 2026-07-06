import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'firebase/auth';
import { IUser } from './model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  #http = inject(HttpClient);
  #apiUrl = 'https://utn-frlp-tup-api-rest.onrender.com/';

  getUserProfile(): Observable<UserProfile> {
    return this.#http.get<UserProfile>(`${this.#apiUrl}me`);
  }

  getUsers(): Observable<IUser> {
    return this.#http.get<IUser>(`${this.#apiUrl}me`);
  }
}
