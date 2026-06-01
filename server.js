import { fastify } from 'fastify';
import { DatabaseMYSQL } from './database-mysql.js';
import 'dotenv/config';
const { PORT } = process.env;


console.log('Variáveis de ambiente carregadas:', { PORT });

const server = fastify();

server.get ('/', async (request, reply) => {
    return { message: 'API server - Gestor de filme'};
});


const database = new DatabaseMYSQL();

server.post ("/filme", async (request, reply) => {
    const {titulo, descricao, duracao } = request.body;
    await database.create({
        titulo,
        descricao,
        duracao,
    });
    console.log(await database.list());
    return reply.status(201).send();
})
server.get("/filme", async (request) => {
    const search = request.query.search;
    console.log(search);
    const filme = await database.list(search);
    return filme
})

server.put('/videos/:id', async (request, reply) => {

    const videoId = request.params.id;
    const { titulo, descricao, duracao } = request.body;

    const video = await database.update(filmeId, {
        titulo,
        descricao,
        duracao,
    });

    return reply.status(204).send();
})

server.delete("/filme/:id", async (request, reply) => {
    const filmeId = request.params.id;
    await database.delete(filmeId);
    return reply.status(204).send();
})


server.listen({port:PORT}, (err, address) => {
    if (err) { 
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});