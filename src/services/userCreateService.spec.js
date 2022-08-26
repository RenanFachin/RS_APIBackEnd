const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");


// o async está aqui para poder usr o await dentro da função para simular exatamente o funcionamento da aplicação
describe("UserCreateService", () =>{

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@teste.com",
            password: "123"
        };
    
        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userCreateService = new UserCreateService(userRepositoryInMemory);
        const userCreated = await userCreateService.execute(user)
        
        //debugando
        console.log(userCreated)
    
        // Espero que o usuário de exemplo criado tenha um objeto com uma propriedade .id
        expect(userCreated).toHaveProperty("id")
    })

    it("", () => {
        
    })
})
