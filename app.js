const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static('./pages'));

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "developer",
    password: "1234567", //Alterar a senha conforme a máquina que está rodando o programa
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
    const query = `insert into usuario (Nome, Email, Senha) values ('${usuario.nome}','${usuario.email}', MD5('${usuario.senha}'))`; // Ajuste a consulta SQL conforme o nome da sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});


//TABELA USUÁRIO - UPDATE
router.put('/api/usuario/:id', (req, res) => {
    const id = req.params.id; 
    const { nome, email, senha } = req.body; 

    if (!nome || !email || !senha) {
        return res.status(400).send('Todos os campos (nome, email, idade) são obrigatórios.');
    }
    var sql = 'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?';

    con.query(sql, [nome, email, senha, id], function (err, result) {
        if (err) {
            console.error(err); // Exibe o erro no console
            return res.status(500).send('Erro ao atualizar o usuário');
        }

        if (result.affectedRows > 0) {
            res.status(200).send(`Usuário com id ${id} atualizado com sucesso`);
        } else {
            res.status(404).send(`Usuário com id ${id} não encontrado`);
        }
    });
});



//TABELA USUÁRIO - DELETE
router.delete('/api/usuario/:id', (req, res) => {
    const id = req.params("id");

    var sql = 'DELETE FROM usuario WHERE id = ?';
    
    con.query(sql, [id], function (err, result) {
        if (err) {
            console.error(err);  // Exibindo o erro no console para facilitar o diagnóstico
            return res.status(500).send('Erro ao excluir usuário');
        }

        if (result.affectedRows > 0) {
            res.status(200).send(`Usuário com id ${id} excluído`);
        } else {
            res.status(404).send(`Usuário com id ${id} não encontrado`);
        }

    res.status(200).send(`usuario com id ${id} excluído`);
});
});

// Ajustar a consulta SQL conforme o nome da tabela

//TABELA PACOTE - GET
router.get('/api/pacote', (req, res) => {
    const query = 'SELECT id_pacote, titulo, descricao, preco, num_compras FROM pacote'; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

//endpoint para capturar um pacote por id
router.get('/api/pacote/:id_pacote', (req, res) => {
    const id = req.params.id_pacote;
    const sql = `SELECT titulo, imagem, descricao, preco FROM pacote WHERE id_pacote = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados:", err); 
            return res.status(500).send("Erro interno no servidor");
        }

        if (result.length === 0) {
            return res.status(404).send("Pacote não encontrado");
        }
        res.status(200).json(result[0]);
    });
});


//TABELA PACOTE - POST
router.post('/api/pacote', (req, res) => {
    var pacote = req.body;
    console.log(pacote);
    const query = `insert into Pacote (Titulo, Imagem, Descricao, Preco) values ('${pacote.titulo}','${pacote.imagem}','${pacote.descricao}','${pacote.preco}')`; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

//TABELA PACOTE - UPDATE
router.put('/api/pacote/:id_pacote', (req, res) => {
    const id = req.params.id_pacote; 
    const { titulo, imagem, descricao, preco } = req.body; 

    if (!titulo || !imagem || !descricao || !preco) {
        return res.status(400).send('Todos os campos (titulo, imagem, descricao, preco) são obrigatórios.');
    }
    var sql = 'UPDATE pacote SET titulo = ?, imagem = ?, descricao = ?, preco = ? WHERE id_pacote = ?';

    db.query(sql, [titulo, imagem, descricao, preco, id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar o pacote');
        }

        if (result.affectedRows > 0) {
            res.status(200).send(`Pacote com id ${id} atualizado com sucesso`);
        } else {
            res.status(404).send(`Pacote com id ${id} não encontrado`);
        }
    });
});

//TABELA PACOTE - DELETE
router.delete('/api/pacote/:id_pacote', (req, res) => {
    const id = req.params.id_pacote;

    var sql = 'DELETE FROM pacote WHERE id_pacote = ?';
    
    db.query(sql, [id], function (err, result) {
        if (err) {
            console.error(err);  // Exibindo o erro no console para facilitar o diagnóstico
            return res.status(500).send('Erro ao excluir usuário');
        }
        if (result.affectedRows > 0) {
            res.status(200).send(`Pacote com id ${id} excluído`);
        } else {
            res.status(404).send(`Pacote com id ${id} não encontrado`);
        }

});
});

app.use(router);

//Escuta a porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})