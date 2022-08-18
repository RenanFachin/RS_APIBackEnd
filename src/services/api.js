// Importando o axios
import axios from "axios";

// método create dentro do axios
// Se passa um objeto para este método
export const api = axios.create({
    baseURL: "http://localhost:3333"
    // endereço do backend, para não precisar repetir em todas as requisições
})


