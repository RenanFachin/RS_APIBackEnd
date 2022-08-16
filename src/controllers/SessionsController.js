// Importando a conexão com o banco de dados
const knex = require ("../database/knex");

// Importando mensagens de erro
const AppError = require("../utils/AppError");

// Importando uma função do BCRYPT para fazer a comparação das senhas criptografadas
const { compare } = require("bcryptjs");

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

        // Fazendo a comparação da senha digitada com a senha que tem cadastrada no banco de dados
        // É aproveitado o user.password porque o user já foi até o banco de dados e já tem esse dado
        const passwordMatched = await compare(password, user.password)


        // Fazendo a verificação da senha digitada
        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        // testando
        return response.json(user)
    }
}

module.exports  = SessionsController;