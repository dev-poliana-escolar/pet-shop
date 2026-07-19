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

  // busca um animal pelo id
  buscarAnimal(id: number) {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

   atualizarAnimal(id: number, animal: any) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      animal,
      {
        headers: this.getHeaders()
      }
    );

  }

    excluirAnimal(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

}