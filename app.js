const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static('./pages'));

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PUC@1234", //Alterar a senha conforme a máquina que está rodando o programa
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

//TABELA USUARIO _ GET
router.get('/api/usuario', (req, res) => {
    const query = 'SELECT * FROM usuario'; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});


//TABELA USUARIIO - POST
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

// Ajuste a consulta SQL conforme o nome da tabela

//TABELA PACOTE - GET
router.get('/api/pacote', (req, res) => {
    const query = 'SELECT * FROM pacote'; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

//TABELA PACOTE - POST
router.post('/api/pacote', (req, res) => {
    var usuario = req.body;
    console.log(usuario);
    const query = `insert into Pacote (Titulo, Descricao, Preco) values ('${pacote.titulo}','${pacote.descricao}','${pacote.preco}')`; 
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