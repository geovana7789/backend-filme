import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMYSQL {

// Listagem de vídeos, com opção de busca por título usando o operador LIKE
async list(search) {
    let filme;

    if (search) {
        // No mysql2, usamos o caractere "?" como placeholder para evitar SQL Injection
        // O resultado vem como [videos, fields], por isso usamos a desestruturação [videos]
        [filme] = await sql.execute(
            'SELECT * FROM filme WHERE title LIKE ?',
            [`%${search}%`]
        );
    } else {
        [filme] = await sql.execute('SELECT * FROM filme');
    }

    return filme;
}

// Criação de um novo vídeo, gerando um ID único usando randomUUID
async create(filme) {
    const filmeId = randomUUID();
    const { titulo, descricao, duracao } = filme;

    // No mysql2, passamos os valores em um array como segundo argumento
    await sql.execute(
        'INSERT INTO filme (id, titulo, descricao, duracao) VALUES (?, ?, ?, ?)',
        [filmeId, titulo, descricao, duracao]
    );
}// Atualização de um vídeo específico usando o ID
async update(id, filme) {
    const { titulo, descricao, duracao } = filme;
    await sql.execute(
        'UPDATE filme SET titulo = ?, descricao = ?, duracao = ? WHERE id = ?',
        [titulo, descricao, duracao, id]
    );
}

// Exclusão de um vídeo específico usando o ID
async delete(id) {
    await sql.execute('DELETE FROM filme WHERE id = ?', [id]);
}
}