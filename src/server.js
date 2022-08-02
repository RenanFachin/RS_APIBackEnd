const express = require("express");

const routes = require("./routes") // acessando a pasta routes e carregando index.js como padrão

const app = express();
app.use(express.json());

app.use(routes);


const PORT = 3333;
app.listen(PORT, () => console.log(`server is running on Port: ${PORT}`));