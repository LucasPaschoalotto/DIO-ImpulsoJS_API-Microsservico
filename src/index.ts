import express from "express";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";

const app = express();

//Configuração da aplicação e rotas
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(userRoute);
app.use(statusRoute);

//Inicialização do servidor
app.listen(3000, () => {
    console.log("Executando aplicação na porta 3000");
})