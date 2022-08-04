// importando o app
const { Router } = require("express");

// Importando o controller
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();


// Instanciando
const tagsController = new TagsController();


tagsRoutes.get("/:user_id", tagsController.index); 


// Exportando
module.exports = tagsRoutes;