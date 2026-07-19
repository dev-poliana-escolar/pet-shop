import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  nome = '';
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar() {

    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.authService.registrar(usuario)
      .subscribe({

        next: () => {

          alert("Usuário cadastrado com sucesso!");

          this.router.navigate(['/']);

        },

        error: (erro) => {

          console.log(erro);

          alert("Erro ao cadastrar usuário.");

        }

      });

  }

}