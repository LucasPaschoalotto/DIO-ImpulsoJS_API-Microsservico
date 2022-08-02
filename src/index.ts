import express from "express";
import errorHandler from "./middleware/error-handler.middleware";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";

const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
app.use(userRoute);
app.use(statusRoute);

//Error Handler
app.use(errorHandler);

//Inicialização do servidor
app.listen(3000, () => {
  console.log(`Executando aplicação na porta 3000\nhttp://localhost:3000/status`)
});