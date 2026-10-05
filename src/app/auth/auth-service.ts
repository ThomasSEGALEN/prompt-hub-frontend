import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { catchError, Observable, of, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { CurrentUser } from './current-user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'auth'

  currentUser = signal<CurrentUser | undefined>(undefined)

  loadCurrentUser() {
    return this.httpClient.get<CurrentUser>(`${this.baseUrl}/me`).pipe(
      tap((currentUser) => this.currentUser.set(currentUser)),
      catchError(() => {
        this.currentUser.set(undefined)
        return of(undefined)
      }),
    )
  }

  login(username: string, password: string): Observable<CurrentUser> {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/login`, { username, password })
      .pipe(tap((currentUser) => this.currentUser.set(currentUser)))
  }

  register(username: string, password: string): Observable<CurrentUser> {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/register`, { username, password })
      .pipe(tap((currentUser) => this.currentUser.set(currentUser)))
  }

  logout(): Observable<void> {
    return this.httpClient
      .post<void>(`${this.baseUrl}/logout`, {})
      .pipe(tap(() => this.currentUser.set(undefined)))
  }
}
