// importando o app
const { Router } = require("express");

// Importando o controller
const UsersController = require("../controllers/UsersController");

// IMportando o middlware de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router();


// Instanciando
const userController = new UsersController();


// MÉTODO POST
usersRoutes.post("/", userController.create);

// ADICIONANDO UMA NOVA ROTA
usersRoutes.put("/", ensureAuthenticated, userController.update)
// qnd for acessada a rota, entrará o ensureAuthenticated para verificar e só depois (next) irá para o update

// Exportando
module.exports = usersRoutes;