import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar() {

    const usuario = {
      email: this.email,
      senha: this.senha
    };

    this.authService.login(usuario)
      .subscribe({

        next: (resposta) => {

          this.authService.salvarToken(resposta.token);

          this.router.navigate(['/animais']);

        },

        error: (erro) => {

          console.log(erro);

          alert("Email ou senha inválidos.");

        }

      });

  }

}