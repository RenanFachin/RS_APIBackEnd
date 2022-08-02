// Criando uma estrutura de inicialização
// Importando o express (pasta node_modules)
const express = require("express");

// Inicializando o express
const app = express();

// Implementando o método GET para quando for solicitado no /message da porta 3333
// Route Params = (VALORES OBRIGATÓRIOS)
app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params // Fazendo a desestruturação do código para evitar a duplicitade

    response.send(`
        Mensagem ID: ${id}.
        Para o usuário: ${user}.
        `) // request.params. é a forma para se capturar um parâmetro enviado pelo método GET
})

// Query Params = (VALORES OPCIONAIS)
app.get("/users", (request, response) => {
    const { page, limit} = request.query; // Desestruturação do request.query

    response.send(`Página: ${page}. Mostrar: ${limit}`);
});




// Criando uma porta para atender as solicitações
const PORT = 3333;

// Adicionando um listen nesta porta para que assim que houver solicitações, fazer algo
app.listen(PORT, () => console.log(`server is running on Port: ${PORT}`));