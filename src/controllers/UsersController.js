// Importando a AppError
const AppError = require("../utils/AppError");



/*
    A classe permite que tenha várias funções dentro, no máximo 5
 
    5 Métodos
    - index = GET para listar vários registros.
    - show = GET para exibir um registro específico.
    - create = POST para poder criar um registro.
    - update = PUT para atualizar um registro.
    - delete = DELETE para poder remover um registro.
*/

class UsersController {
    // A classe já sabe que create é um método por isso não precisa do FUNCTION
    create(request, response){
    // Obtendo as informações passadas pelo método POST
    const { name, email, password } = request.body;

    if(!name){
        // Se o nome não existir
        throw new AppError("Nome é obrigatório!");
    }

    response.status(201).json({ name, email, password }); // status(201) para avisar que está criado
    }
}


module.exports = UsersController;