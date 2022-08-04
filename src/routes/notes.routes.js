// importando o app
const { Router } = require("express");

// Importando o controller
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();


// Instanciando
const notesController = new NotesController();


// MÉTODO POST
notesRoutes.post("/:user_id", notesController.create);


// Exportando
module.exports = notesRoutes;