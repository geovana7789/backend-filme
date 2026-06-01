import { sql } from "./db.js";


const createTableQuerry = `
CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(255) PRIMARY KEY, 
    title VARCHAR (255), 
    description TEXT, 
    duration INT
);
`;


sql.query(createTableQuerry)
    .then(() => {
        console.log("Tabela 'videos' criada ou já existente com sucesso no MySQL");

    });