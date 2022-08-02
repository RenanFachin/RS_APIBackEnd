// importando o app
const { Router } = require("express");

const usersRoutes = Router();

// MÉTODO POST
usersRoutes.post("/", (request, response) => {
    // Obtendo as informações passadas pelo método POST
    const { name, email, password } = request.body;

    response.json({ name, email, password }); // resposta no modo de objeto (json)
})

// Exportando
module.exports = usersRoutes;