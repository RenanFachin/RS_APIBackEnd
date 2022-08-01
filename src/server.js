// Criando uma estrutura de inicialização
// Importando o express (pasta node_modules)
const express = require("express");

// Inicializando o express
const app = express();

// Implementando o método GET para quando for solicitado no /message da porta 3333
app.get("/message", (request, response) => {
    response.send("Hello, world")
})

// Criando uma porta para atender as solicitações
const PORT = 3333;

// Adicionando um listen nesta porta para que assim que houver solicitações, fazer algo
app.listen(PORT, () => console.log(`server is running on Port: ${PORT}`));