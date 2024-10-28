const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static('./pages'));



const mysql = require('mysql2');


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "PUC@1234",
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

const router = express.Router();

router.get('/api/usuario', (req, res) => {
    const query = 'SELECT * FROM usuario'; // Ajuste a consulta SQL conforme o nome da sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

router.post('/api/usuario', (req, res) => {
    var usuario = req.body;
    console.log(usuario);
    const query = `insert into usuario (Nome, Email, Senha) values ('${usuario.nome}','${usuario.email}','${usuario.senha}')`; // Ajuste a consulta SQL conforme o nome da sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

app.use(router);

//Escuta a porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})