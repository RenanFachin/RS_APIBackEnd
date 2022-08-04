const knex = require("../database/knex");  // Será carregado o arquivo index como default

class NotesController{
    // criando um anota
    async create(request, response){

        const { title, description, tags, links} = request.body;
        // desestruturando o que será enviado pelo body da requisição

        const { user_id } = request.params; // pegando o user_id que tá sendo enviado via parâmetro

        // Cadastrando o id da nota cadastrada
        const note_id = await knex ("notes").insert({
            title,
            description,
            user_id
        });

        // .map para percorrer cada item
        const linksInsert = links.map(link => {
            return{
                note_id, 
                url: link
            }
        });

        await knex("links").insert(linksInsert);

        // .map para percorrer cada item
        const tagsInsert = tags.map(name => {
            return{
                note_id, 
                name,
                user_id
            }
        });
        
        await knex("tags").insert(tagsInsert);


        response.json();
    }

    // mostrando uma nota
    async show(request, response){
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first();
        // utilizando o where.first()    para buscar o id como um parametro

        const tags = await knex("tags").where({ note_id: id}).orderBy("name");
        const links = await knex("links").where({note_id: id}).orderBy("created_at");

        return response.json({
            ...note,
            tags,
            links
        });
    }

    // deletando uma nota
    async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    // função de listar notas
    async index(request, response){
        const { title, user_id, tags } = request.query;

        let notes;

        // Se existir uma tag, faça
        if(tags){
            // convertendo de um texto simples para um vetor
            const filterTags = tags.split(',').map(tag => tag.trim());
            
            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id",
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filterTags) // Fazendo a comparação das tags com os vetores dentro de filterTags
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.title");

        }else{
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`) // Busca por valores que uma palavra contenha dentro
            .orderBy("title"); // para ordenar
        }

        return response.json({ notes });

    }
}

module.exports = NotesController;