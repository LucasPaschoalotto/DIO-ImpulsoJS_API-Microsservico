import express from "express";
import bearerAuthenticationMiddleware from "./middleware/bearer-authentication.middleware";
import errorHandler from "./middleware/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
app.use(statusRoute);
app.use(bearerAuthenticationMiddleware, usersRoute);
app.use(authorizationRoute);

//Error Handler
app.use(errorHandler);

//Inicialização do servidor
app.listen(3000, () => {
  console.log(`Executando aplicação na porta 3000\nhttp://localhost:3000/status`)
});