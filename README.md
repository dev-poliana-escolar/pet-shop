# PetShop — Cadastro de Animais

Sistema web com cadastro de usuários (login/registro com JWT) e cadastro de animais, com preenchimento automático de endereço via **API ViaCEP**.

- **Backend:** ASP.NET Core (.NET) + Entity Framework Core + SQL Server + JWT
- **Frontend:** Angular 21 (standalone components)
- **Banco de dados:** SQL Server rodando em Docker

---

## Pré-requisitos

Antes de começar, instale na máquina:

- [.NET SDK](https://dotnet.microsoft.com/download) (versão 8 ou superior)
- [Node.js](https://nodejs.org/) (versão 18 ou superior) + npm
- [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`
- (Opcional, mas recomendado) [EF Core Tools](https://learn.microsoft.com/ef/core/cli/dotnet):
  ```bash
  dotnet tool install --global dotnet-ef
  ```

---

## 1. Clonar o repositório

```bash
git clone https://github.com/dev-poliana-escolar/pet-shop.git
cd petshop
```

A estrutura esperada é algo como:

```
petshop/
├── backend/            (projeto .NET)
├── frontend/           (projeto Angular)
└── docker-compose.yml  (configuração do SQL Server)
```

Ajuste os caminhos abaixo se a sua estrutura de pastas for diferente.

---

## 2. Subir o SQL Server no Docker

O projeto já tem um `docker-compose.yml` (na raiz do repositório) configurado para subir o SQL Server. Basta rodar:

```bash
docker compose up -d
```

Isso sobe um container chamado `pet_db`, com o SQL Server escutando na porta `1433` e os dados persistidos no volume `sqlserver_data` (ou seja, os dados não se perdem se você derrubar e subir o container de novo).

Para conferir se o container está rodando:

```bash
docker ps
```

Para parar:

```bash
docker compose stop
```

Para subir novamente depois (sem perder os dados):

```bash
docker compose start
```

---

## 3. Configurar o Backend

### 3.1. Entrar na pasta do backend

```bash
cd backend
```

### 3.2. Restaurar pacotes

```bash
dotnet restore
```

### 3.3. Aplicar as migrations (criar o banco e as tabelas)

```bash
dotnet ef database update
```

Isso cria o banco `pet_db` no container do SQL Server e aplica todas as migrations existentes (tabelas `Usuarios` e `Animais`).

### 3.5. Rodar o backend

```bash
dotnet run
```

Por padrão, deve subir em algo como `http://localhost:5019` (confira a porta exata no terminal). Se a porta for diferente de `5019`, você vai precisar ajustar as URLs no frontend (passo 4.3).

Deixe esse terminal aberto rodando o backend.

---

## 4. Configurar o Frontend

Abra um **novo terminal** (deixe o backend rodando no outro).

### 4.1. Entrar na pasta do frontend

```bash
cd frontend
```

### 4.2. Instalar as dependências

```bash
npm install
```

### 4.3. Conferir as URLs da API

Os serviços do Angular apontam para a API em `http://localhost:5019`. Confira/ajuste se necessário nos arquivos:

- `src/app/services/auth.service.ts` → `private apiUrl = 'http://localhost:5019/api/Auth';`
- `src/app/services/animal.service.ts` → `private apiUrl = 'http://localhost:5019/api/Animal';`

### 4.4. Rodar o frontend

```bash
ng serve
```

Acesse em: **http://localhost:4200**

---

## 5. Testando o fluxo completo

1. Acesse `http://localhost:4200` → tela de Login
2. Clique em "Cadastrar" → crie um usuário
3. Faça login com o usuário criado
4. Você será redirecionado para `/animais`
5. Clique em "Adicionar novo animal", preencha o CEP e saia do campo (Tab ou clique fora) — os campos de Logradouro, Bairro, Cidade e UF devem preencher automaticamente via ViaCEP
6. Complete o restante do formulário e cadastre o animal

---

## Erros comuns

| Erro | Causa provável | Solução |
|---|---|---|
| `CORS blocked` no console do navegador | Backend não está rodando, ou porta errada, ou `UseHttpsRedirection()` redirecionando para HTTPS | Confirme que o backend está rodando com `dotnet run` e que a porta bate com a do `apiUrl` no frontend |
| `401 Unauthorized` ao listar/cadastrar animais | Token JWT ausente ou expirado | Faça login novamente |
| Erro ao conectar no SQL Server | Container do Docker não está rodando, ou senha errada na connection string | `docker ps` para conferir, `docker compose start` se estiver parado |
| CEP não preenche os campos | CEP inválido/inexistente, ou sem conexão com a internet | A API ViaCEP (`viacep.com.br`) precisa de acesso à internet — não funciona offline |
| `dotnet ef` não é reconhecido | EF Core Tools não instalado | `dotnet tool install --global dotnet-ef` |

---

## Estrutura de portas (padrão deste projeto)

| Serviço | Porta |
|---|---|
| Frontend (Angular) | `4200` |
| Backend (API .NET) | `5019` |
| SQL Server (Docker) | `1433` |