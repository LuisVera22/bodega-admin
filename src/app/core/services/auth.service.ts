import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/auth';
  private SIGNIN_URL = this.API_URL + '/login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  signIn(username: string, password: string) : Observable<any>
  {
    return this.httpClient.post<any>(this.SIGNIN_URL, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    )
  }

  private setToken(token: string): void
  {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null
  {
    if (typeof window != 'undefined')
      return localStorage.getItem(this.tokenKey);
    return null;
  }

  isAuthenticated(): boolean
  {
    const token = this.getToken();
    if(!token)
      return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;

    return Date.now() < expirationTime;
  }

  signOut(): void
  {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/iniciar-sesion']);
  }
}
