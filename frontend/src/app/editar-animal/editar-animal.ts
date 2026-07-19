import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimalService } from '../services/animal.service';


@Component({
  selector: 'app-editar-animal',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-animal.html',
  styleUrl: './editar-animal.css',
})
export class EditarAnimal implements OnInit {


  id!: number;


  // dados do animal
  nome = '';
  idade = 0;
  peso = 0;
  dataNascimento = '';
  especie = '';


  // dados do tutor
  nomeTutor = '';
  cpf = '';


  // endereço
  cep = '';
  logradouro = '';
  numero = 0;
  bairro = '';
  cidade = '';
  uf = '';



  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}



  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.carregarAnimal();

  }



  carregarAnimal() {

    this.animalService.buscarAnimal(this.id)
      .subscribe({

        next: (animal) => {

          this.nome = animal.nome;
          this.idade = animal.idade;
          this.peso = animal.peso;
          this.dataNascimento = animal.dataNascimento;
          this.especie = animal.especie;

          this.nomeTutor = animal.nomeTutor;
          this.cpf = animal.cpf;

          this.cep = animal.cep;
          this.logradouro = animal.logradouro;
          this.numero = animal.numero;
          this.bairro = animal.bairro;
          this.cidade = animal.cidade;
          this.uf = animal.uf;

        },

        error: (erro) => {

          console.error(erro);
          alert("Erro ao carregar animal");

        }

      });

  }




  atualizarAnimal() {


    const animalAtualizado = {

      id: this.id,

      nome: this.nome,
      idade: this.idade,
      peso: this.peso,
      dataNascimento: this.dataNascimento,
      especie: this.especie,

      nomeTutor: this.nomeTutor,
      cpf: this.cpf,

      cep: this.cep,
      logradouro: this.logradouro,
      numero: this.numero,
      bairro: this.bairro,
      cidade: this.cidade,
      uf: this.uf

    };


    this.animalService.atualizarAnimal(
      this.id,
      animalAtualizado
    )
    .subscribe({

      next: () => {

        alert("Animal atualizado com sucesso!");

        this.router.navigate(['/animais']);

      },

      error: (erro) => {

        console.error(erro);
        alert("Erro ao atualizar animal");

      }

    });

  }



  cancelar() {

    this.router.navigate(['/animais']);

  }


}