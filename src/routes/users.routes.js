// importando o app
const { Router } = require("express");

// Importando o controller
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();


// Instanciando
const userController = new UsersController();


// MÉTODO POST
usersRoutes.post("/", userController.create);

// Exportando
module.exports = usersRoutes;