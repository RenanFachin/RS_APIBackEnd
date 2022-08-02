// importando o app
const { Router } = require("express");

// Importando o controller
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

function myMiddleware(request, response, next){
    console.log("Você passou pelo middleware!");
    
    // Caso o usuário não seja um admin
    if(!request.body.isAdmin){ // Obtendo as informações enviadas na requisição
        return response.json({ message: "user unatuthorized" });
    }

    next();
}









// Instanciando
const userController = new UsersController();


// MÉTODO POST
usersRoutes.post("/", myMiddleware, userController.create);

// Exportando
module.exports = usersRoutes;