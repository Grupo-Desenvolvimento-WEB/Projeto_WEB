const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world teste');
})
//Escuta a porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})

const mysql = require('mysql');


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Projeto_Web"
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

app.get('/usuario', (req, res) => {
    const query = 'SELECT * FROM usuarios'; // Ajuste a consulta SQL conforme o nome da sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});