<h1 align="center">
    <img alt="Folhas Que Salvam" title="#Folhas" src="./assets/banner.png" />
</h1>

<h1 align="center">
   🌍 <a href="#" alt="site do Folhas Que Salvam"> Folhas Que Salvam </a>
</h1>

<h3 align="center">
    🌱 Mude seus hábitos, mude o mundo! O projeto Folhas Que Salvam ensina você a se conscientizar sobre questões ambientais e adotar hábitos sustentáveis em sua rotina diária. 💚
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/daniel-bernardino747/folhasquesalvam?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/daniel-bernardino747/folhasquesalvam">
  
  <img alt="os-linux" src="https://img.shields.io/static/v1?label=os&message=Linux&color=459a2b&style=flat-square&logo=ghost" />
  
  <a href="https://github.com/tgmarinho/README-ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/daniel-bernardino747/folhasquesalvam">
  </a>
    
  <img alt="License" src="https://img.shields.io/badge/license-MPL-brightgreen">

  <a href="https://rocketseat.com.br">
    <img alt="Feito por Dann" src="https://img.shields.io/badge/feito%20com-❤️-%237519C1">
  </a>
  
  <img alt="npm-8.15.0" src="https://img.shields.io/static/v1?label=npm&message=8.15.0&color=459a2b&style=flat-square" />
</p>

<h4 align="center">
  :recycle:  Em Progresso  :recycle:
</h4>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)
   * [Layout](#-layout)
     * [Web](#web)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Backend (servidor)](#user-content--rodando-o-backend-servidor)
     * [Rodando a aplicação web (Frontend)](#user-content--rodando-a-aplicação-web-frontend)
   * [Tecnologias](#-tecnologias)
     * [WebSite](#user-content-website--nextjs----typescript)
     * [Server](#user-content-server--nestjs----typescript)
   * [Como contribuir no projeto](#-como-contribuir-no-projeto)
   * [Autor](#-autor)
   * [Licença](#user-content--licença)
<!--te-->


## 💻 Sobre o projeto

♻️ Folhas Que Salvam - é uma forma de mudar pessoas, empresas e entidades que precisam mudar suas rotinas de maneira sustentável.

---

## 🔧 Funcionalidades

- [x] Usuários podem se cadastrar na plataforma web enviando:
  - [x] Nome (opcional), email e senha
  - [x] ou conectando-se via Google Account

- [x] Os usuários tem acesso à plataforma, onde podem:
  - [ ] Requisitar um cargo dentro do Folhas (Embaixador, Time ou Voluntário)
  - [ ] entrar em contato com a entidade através do E-mail ou do WhatsApp.
  
- [x] Os usuários com cargo de Membro do Time e Diretor, podem:
  - [x] Visualizar seu dashboard e suas metas para cumprirem.
  - [x] Mover as metas entre as colunas ("A fazer", "Em andamento" ou "Feito").
  - [x] Visualizar outros membros e seus respectivos cargos dentro do projeto.
  - [ ] Visualizar os pontos obtidos de acordo com o cumprimento das metas.
  
- [x] Apenas os usuários com cargo de Membro Diretor, podem:
  - [x] Criar e atribuir novas metas aos membros do Time.
  
---

## 🎨 Layout

O layout da aplicação está disponível no Figma:

<a href="https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/Ecoleta?node-id=136%3A546">
  <img alt="Made by tgmarinho" src="https://img.shields.io/badge/Acessar%20Layout%20-Figma-%2304D361">
</a>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/web.svg" width="400px">

  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/sucesso-web.svg" width="400px">
</p>

---

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend (pasta server) 
2. Frontend (pasta web)

💡O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:daniel-bernardino747/folhasquesalvam.git

# Acesse a pasta do projeto no terminal/cmd
$ cd folhasquesalvam

# Vá para a pasta back-end
$ cd back-end

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente descritas em `.env.example`, criando um `.env` e copiando as variáveis.
$ touch .env

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:4000 - acesse http://localhost:4000 

```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone git@github.com:daniel-bernardino747/folhasquesalvam.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd folhasquesalvam

# Vá para a pasta da aplicação Front End
$ cd front-end

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente descritas em `.env.example`, criando um `.env` e copiando as variáveis.
$ touch .env

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([NextJS](https://nextjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Clerk API Front-end](https://clerk.com/)**
-   **[animate.css](https://animate.style/)**
-   **[clsx](https://github.com/lukeed/clsx)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[React Datepicker](https://reactdatepicker.com/)**
-   **[React Hook Form](https://react-hook-form.com/)**
-   **[React Pro Sidebar](https://github.com/azouaoui-med/react-pro-sidebar/)**
-   **[React Use](https://github.com/streamich/react-use/)**
-   **[SweetAlert2](https://sweetalert2.github.io/)**

> Veja o arquivo  [package.json](https://github.com/daniel-bernardino747/folhasquesalvam/blob/main/front-end/package.json)

#### [](https://github.com/daniel-bernardino747/folhasquesalvam#server-nestjs--typescript) **Server**  ([NestJS](https://nestjs.com/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Clerk API Back-end](https://clerk.com/)**
-   **[Axios](https://axios-http.com/ptbr/)**
-   **[Prisma](https://www.prisma.io/)**
-   **[Swagger](https://swagger.io/)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Class Validator](https://github.com/typestack/class-validator)**

> Veja o arquivo  [package.json](https://github.com/daniel-bernardino747/folhasquesalvam/blob/main/back-end/package.json)

#### [](https://github.com/daniel-bernardino747/folhasquesalvam#utilit%C3%A1rios)**Utilitários**

-   Protótipo:  **[Figma](https://www.figma.com/)**  →  **[Protótipo (Ecoleta)](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/Ecoleta)**
-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**  → Extensions:  **[SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)**
-   Markdown: **[Markdown Emoji](https://gist.github.com/rxaviers/7360908)**
-   Commit Conventional:  **[Commitlint](https://github.com/conventional-changelog/commitlint)**
-   Teste de API:  **[Thunder Client](https://www.thunderclient.com/)**
-   Fontes: **[Roboto](https://fonts.google.com/specimen/Roboto)**


---


## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 🦸 Autor

<a href="https://github.com/daniel-bernardino747">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/106272711?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Daniel Bernardino</b></sub>
</a>

[![Linkedin Badge](https://img.shields.io/badge/-danielbernardinodesouza-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/danielbernardinodesouza/)](https://www.linkedin.com/in/danielbernardinodesouza/) 
[![Gmail Badge](https://img.shields.io/badge/-dn.danielbernardino@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:dn.danielbernardino@gmail.com)](mailto:dn.danielbernardino@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença [MLP](./LICENSE).

Feito com ❤️ por Daniel Bernardino 👋🏽 [Entre em contato!](https://www.linkedin.com/in/danielbernardinodesouza/)
