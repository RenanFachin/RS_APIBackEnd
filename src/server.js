// importando a biblioteca para tratamento de erros
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations") // importando a database
const AppError= require("./utils/AppError") // Importando o AppError

const express = require("express");
const routes = require("./routes") // acessando a pasta routes e carregando index.js como padrão

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next ) => {
    if(error instanceof AppError){
        // Se o erro acontecer no client side
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.log(error); // Apenas para poder debugar melhor o código
    
    // se o erro não for no client side, será emitido um erro padrão
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`server is running on Port: ${PORT}`));