# Quiz Project - Backend

## 📌 Visão Geral

O **Quiz Project** é uma API desenvolvida em Node.js para gerenciar quizzes interativos. Ele permite a criação de quizzes, o gerenciamento de usuários e a autenticação segura via JWT.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Prisma** - ORM para interação com banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Jest** - Framework de testes
- **Supertest** - Biblioteca para testes de integração
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Bcrypt** - Hash de senhas
- **Swagger** - Documentação da API

## 📂 Estrutura do Projeto

```
quiz_project/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── prisma/
│   ├── config/
│   ├── index.js
├── tests/
│   ├── auth.test.js
│   ├── testResults.test.js
├── .env.example
├── package.json
├── prisma/schema.prisma
├── README.md
```

## ⚙️ Configuração e Instalação

### **1️⃣ Clonar o Repositório**

```sh
git clone https://github.com/vinecwb/quiz_project.git
cd quiz_project
```

### **2️⃣ Instalar Dependências**

```sh
yarn install
```

### **3️⃣ Configurar as Variáveis de Ambiente**

Renomeie o arquivo `.env.example` para `.env` e configure as credenciais do banco de dados e JWT.

### **4️⃣ Rodar Migrações do Prisma**

```sh
yarn prisma migrate dev
```

### **5️⃣ Iniciar o Servidor**

```sh
yarn dev
```

O servidor estará disponível em `http://localhost:3001`.

## 🛠️ Rotas da API

A API segue a estrutura RESTful e está documentada via **Swagger**.
Acesse a documentação em `http://localhost:3001/api-docs`

### **🔑 Autenticação**

- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login de usuário

### **📊 Test Results**

- `GET /test-results/:id` - Retorna os resultados de um quiz

## 🧪 Testes

Para rodar os testes unitários e de integração:

```sh
yarn test
```
