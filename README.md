# Projeto: Criação de uma API de microsserviços - Bootcamp DIO: Impulso Javascript Evolution

Projeto realizado durante o Bootcamp DIO: Impulso Javascript Evolution para criar uma API de microsserviços.

Possui os métodos CRUD para Usuários:
- GET /users
- GET /users/:uuid
- POST /users
- PUT /users/:uuid
- DELETE /users/:uuid

Método de autenticação através de token JWT:
- Basic authentication em /token, retornando o token JWT para validação Bearer - necessário para acessar os métodos CRUD
- Validação do token em /token/validate

## Conteúdo:
- Node.js
- Express
- Typescript
- Arquitetura REST
- Implementação de um Banco de Dados Relacional (PostgreSQL) através do ElephantSQL (hospedagem do DB em núvem)
- Tratamento de erros através de middleware
- Autenticação (Basic e Bearer) através de token JWT