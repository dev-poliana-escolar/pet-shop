import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'http://localhost:5019/api/Animal';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.pegarToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  listarAnimais() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  criarAnimal(animal: any) {
    return this.http.post(this.apiUrl, animal, { headers: this.getHeaders() });
  }

}