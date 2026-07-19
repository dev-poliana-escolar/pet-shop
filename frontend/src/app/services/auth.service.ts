import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5019/api/Auth';

  constructor(private http: HttpClient) {}

  registrar(usuario: any) {
    return this.http.post(
      `${this.apiUrl}/register`,
      usuario
    );
  }

  login(usuario: any) {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      usuario
    );
  }

  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  pegarToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}