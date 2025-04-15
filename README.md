# MelloApp API

Este projeto é a API para o MelloApp, um aplicativo desenvolvido para gerenciar desafios, interações com usuários, e armazenar informações sobre dados.

## 📋 Sumário

- [Descrição](#descricao)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
  - [Pré-requisitos](#pre-requisitos)
  - [Passo a Passo](#passo-a-passo)
- [Variáveis de Ambiente](#variaveis-de-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Contribuir](#como-contribuir)
- [Licença](#licenca)

## 📝 Descrição

O MelloApp API é uma aplicação que permite a criação de desafios e acompanhamento de progresso. Ela interage com o banco de dados MongoDB e expõe endpoints para manipulação de dados. O backend foi desenvolvido usando Node.js, Express e MongoDB, com autenticação JWT para segurança.

## 💻 Tecnologias Usadas

- **Node.js** - Ambiente de execução JavaScript.
- **Express.js** - Framework para criação de APIs.
- **MongoDB** - Banco de dados NoSQL.
- **JWT** - Autenticação baseada em tokens.
- **Docker** - Para facilitar a containerização da aplicação.
- **dotenv** - Carregamento de variáveis de ambiente.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) ou [Docker MongoDB Image](https://hub.docker.com/_/mongo)
- [NPM ou Yarn](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/melloapp-api.git
   cd melloapp-api
   ```

2. **Instale as dependências**:

   Se estiver utilizando o NPM:

   ```bash
   npm install
   ```

   Ou, se estiver utilizando o Yarn:

   ```bash
   yarn install
   ```

3. **Configuração do Docker**:

   - Certifique-se de que o Docker está instalado e em execução na sua máquina.
   - Suba os containers necessários para o banco de dados e a aplicação:

     ```bash
     docker-compose up -d
     ```

   O servidor estará disponível em `http://localhost:7272`.

### **Rodando a aplicação no Docker**:

Se preferir rodar o projeto utilizando Docker, execute o seguinte comando:

```bash
docker-compose up --build
```

## 🛠️ Variáveis de Ambiente

O arquivo `.env` deve conter as seguintes variáveis de ambiente:

- **MONGO_INITDB_DATABASE**: Nome do banco de dados MongoDB.
- **MONGO_INITDB_ROOT_USERNAME**: Usuário admin do MongoDB.
- **MONGO_INITDB_ROOT_PASSWORD**: Senha do usuário admin do MongoDB.
- **API_PORT**: Porta na qual a API irá rodar.
- **SECRET**: Chave secreta utilizada para gerar o JWT.
- **CONNECTION_STRING**: String de conexão com o banco de dados MongoDB.

Exemplo de um arquivo `.env`:

```
MONGO_INITDB_DATABASE=mello-db
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=admin123

API_PORT=7272

SECRET=secret

CONNECTION_STRING=mongodb://root:admin123@mello-db:27017/mello-db?authSource=admin
```

## 📂 Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
melloapp-api/
├── src/
│   ├── config/
│   │   └── db.ts        # Configuração do banco de dados
│   ├── middlewares/      # Controladores da API
│   ├── models/           # Modelos de dados
│   ├── routes/           # Rotas da API
│   ├── services/         # Lógica de negócios
│   └── utils/            # Funções utilitárias
├── .env                  # Arquivo de variáveis de ambiente
├── Dockerfile            # Dockerfile para desenvolvimento
├── docker-compose.yml    # Arquivo de configuração do Docker
├── package.json          # Dependências do Node.js
└── README.md             # Este arquivo
```

## 💡 Como Contribuir

1. **Fork o repositório**
2. **Crie uma branch para a sua feature**: `git checkout -b minha-nova-feature`
3. **Faça as alterações e adicione testes** (se necessário)
4. **Commit suas alterações**: `git commit -am 'Adicionando nova feature'`
5. **Push na sua branch**: `git push origin minha-nova-feature`
6. **Abra um Pull Request**