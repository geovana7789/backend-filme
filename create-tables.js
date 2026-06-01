import { sql } from "./db.js";


const createTableQuerry = `
CREATE TABLE IF NOT EXISTS filme (
    id VARCHAR(255) PRIMARY KEY, 
    titulo VARCHAR (255), 
    descricao TEXT, 
    duracao INT
);
`;


sql.query(createTableQuerry)
    .then(() => {
        console.log("Tabela 'filme' criada ou já existente com sucesso no MySQL");

    });