// Importando a conexão com o banco de dados
const knex = require ("../database/knex");

// Importando mensagens de erro
const AppError = require("../utils/AppError");

class SessionsController {
    async create(request, response){
        const { email, password } = request.body

        const user = await knex("users").where({email}).first();
        // Usando o knex para acessar a tabela de users e fazer um filtro de email


        // Fazendo a validação
        // Caso o usuário não exista
        if (!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        // testando
        return response.json(user)
    }
}

module.exports  = SessionsController;