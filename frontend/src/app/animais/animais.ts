import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnimalService } from '../services/animal.service';
import { ViaCepService } from '../services/viacep.service';

@Component({
  selector: 'app-animais',
  imports: [CommonModule, FormsModule],
  templateUrl: './animais.html',
  styleUrl: './animais.css',
})
export class Animais implements OnInit {

  animais: any[] = [];

  mostrarFormulario = false;

  buscandoCep = false;

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
    private viaCepService: ViaCepService
  ) {}

  ngOnInit(): void {
    this.carregarAnimais();
  }

  carregarAnimais() {
    this.animalService.listarAnimais().subscribe({
      next: (dados) => {
        this.animais = dados;
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  buscarCep() {

    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return; // CEP incompleto, não busca ainda
    }

    this.buscandoCep = true;

    this.viaCepService.buscarCep(cepLimpo).subscribe({
      next: (dados) => {

        this.buscandoCep = false;

        if (dados.erro) {
          alert("CEP não encontrado.");
          return;
        }

        this.logradouro = dados.logradouro;
        this.bairro = dados.bairro;
        this.cidade = dados.localidade;
        this.uf = dados.uf;

      },
      error: (erro) => {
        this.buscandoCep = false;
        console.error(erro);
        alert("Erro ao buscar o CEP.");
      }
    });

  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
    this.limparFormulario();
  }

  cadastrarAnimal() {

    const novoAnimal = {
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

    this.animalService.criarAnimal(novoAnimal).subscribe({
      next: () => {
        alert("Animal cadastrado com sucesso!");
        this.carregarAnimais();
        this.mostrarFormulario = false;
        this.limparFormulario();
      },
      error: (erro) => {
        console.error(erro);
        alert(erro.error || "Erro ao cadastrar animal.");
      }
    });

  }

  private limparFormulario() {
    this.nome = '';
    this.idade = 0;
    this.peso = 0;
    this.dataNascimento = '';
    this.especie = '';
    this.nomeTutor = '';
    this.cpf = '';
    this.cep = '';
    this.logradouro = '';
    this.numero = 0;
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
  }

}