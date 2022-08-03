// Importando a AppError
const AppError = require("../utils/AppError");

// Importando a conexão com o banco de dados
const sqliteConnection = require ("../database/sqlite")


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
     async create(request, response){
    // Obtendo as informações passadas pelo método POST
    const { name, email, password } = request.body;
    
    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)" , [email]) // (?) será substituido pelo email enviado pelo request.
    // Este select faz a conferência se o email já esta em uso por algum usuário

    if (checkUserExists){
        throw new AppError("Este e-mail já está em uso.")
    }

    return response.status(201).json()
    }
}

module.exports = UsersController;