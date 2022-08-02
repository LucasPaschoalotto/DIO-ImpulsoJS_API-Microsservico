import express from "express";
import errorHandler from "./middleware/error-handler.middleware";
import jwtAuthenticationMiddleware from "./middleware/jwt-authentication.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas de status e autenticação Básica
app.use(statusRoute);
app.use(authorizationRoute);

//Rotas de autenticação Bearer e usuários
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//Error Handler
app.use(errorHandler);

//Inicialização do servidor
app.listen(3000, () => {
  console.log(`Executando aplicação na porta 3000\nhttp://localhost:3000/status`)
});