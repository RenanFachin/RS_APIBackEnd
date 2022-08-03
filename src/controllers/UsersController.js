// IMPORTANDO criptografia
const { hash } = require ("bcryptjs"); 

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

    // CHECANDO SE O EMAIL DIGITADO JÁ EXISTE EM ALGUM LUGAR DA TABELA
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)" , [email]) // (?) será substituido pelo email enviado pelo request.
    // Este select faz a conferência se o email já esta em uso por algum usuário
    if (checkUserExists){
        throw new AppError("Este e-mail já está em uso.");
    }

    
    // Fazendo a criptografia da senha com um fator de complexidade 8
    const hashedPassword = await hash(password, 8);

    // CADASTRO DE USUÁRIOS
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
    [ name, email, hashedPassword ]);

    return response.status(201).json();
    }
}

module.exports = UsersController;