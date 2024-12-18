const express = require('express');

const app = express();
app.use(express.json());
const bcrypt = require('bcryptjs');

app.use(express.static('./pages'));

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PUC@1234", //Alterar a senha conforme a máquina que está rodando o programa
    database: "Projeto_Web",

    typeCast: function (field, next) {
        if (field.type === "BLOB") {
            return field.buffer();
        }
        return next();
    },
});

const session = require('express-session');

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // True se usar HTTPS
        httpOnly: true,
    },
}));

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});


// Endpoint para registrar novo usuário (com bcrypt)
app.post('/api/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)';
    const values = [nome, email, hashedPassword];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err.message);
            return res.status(500).send('Erro ao registrar usuário');
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
});

// Endpoint para login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const sql = 'SELECT * FROM Usuario WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err.message);
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
        }

        console.log('Resultados da consulta:', results);

        if (results.length === 0) {
            console.log('Email não encontrado:', email);
            return res.status(401).json({ message: 'Email não encontrado' });
        }

        const user = results[0];
        console.log('Usuário encontrado:', user);

        if (!user.senha) {
            console.error('Senha ausente no banco para o usuário:', email);
            return res.status(500).json({ message: 'Erro interno: senha não encontrada' });
        }

        try {
            const match = await bcrypt.compare(senha, user.senha);
            console.log('Senha comparada:', match);

            if (!match) {
                console.log('Senha incorreta para o usuário:', email);
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            // Criar sessão
            req.session.userId = user.id;
            req.session.username = user.nome;
            console.log('Sessão criada para o usuário:', user.nome);

            res.status(200).json({ message: `Bem-vindo, ${user.nome}` });
        } catch (err) {
            console.error('Erro ao comparar senha:', err.message);
            res.status(500).json({ message: 'Erro interno ao verificar senha' });
        }
    });
});
   
// // Middleware para proteger rotas
// function authMiddleware(req, res, next) {
//     if (req.session.userId) {
//         return next();
//     }
//     res.status(401).send('Não autorizado');
// }

// procura se existe um usuario logado
app.get('/api/me', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    res.status(200).json({
        userId: req.session.userId,
        username: req.session.username
    });
});



// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao encerrar sessão');
        }
        res.clearCookie('user_session');
        res.status(200).send('Logout realizado com sucesso');
    });
});

const router = express.Router();

//TABELA USUARIO _ GET
router.get('/api/usuario', (req, res) => {
    const query = 'SELECT id_usuario, nome, email FROM usuario'; 
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
    const usuario = req.body;
    console.log(usuario);
    const query = `insert into usuario (Nome, Email, Senha) values ('${usuario.nome}','${usuario.email}', '${usuario.senha}'`; // Ajuste a consulta SQL conforme o nome da sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

//TABELA USUARIO
app.post('/api/register', (req, res) => {
    const nome = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
  
    const sql = 'INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)';
    const values = [nome, email, password];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados:', err.message);
      }
    console.log('Usuário registrado ID: ${result.insertId}');
    res.redirect("../index.html");
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

//TABELA PACOTE - GET
// Atualizar o endpoint para listar pacotes
router.get('/api/pacote', (req, res) => {
    const query = 'SELECT id_pacote, imagem, titulo, descricao, preco FROM pacote';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacotes:', err);
            res.status(500).send('Erro ao buscar pacotes');
            return;
        }

        // Adicionando logs para verificar o conteúdo das imagens
        console.log('Pacotes encontrados:', results);

        // Converte cada BLOB de imagem em Base64, se necessário
        const pacotes = results.map(pacote => {
            if (pacote.imagem) {
                console.log(`Processando imagem para o pacote ${pacote.id_pacote}`);
                // Verifica se é um BLOB ou uma URL
                if (Buffer.isBuffer(pacote.imagem)) {
                    const imagemBase64 = Buffer.from(pacote.imagem).toString('base64');
                    pacote.imagem = `data:image/jpeg;base64,${imagemBase64}`;
                }
            } else {
                console.warn(`Pacote ${pacote.id_pacote} não contém imagem.`);
            }
            return pacote;
        });

        res.json(pacotes);
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

//rota pra imagens
router.get('/api/pacote/:id/imagens', (req, res) => {
    const pacoteId = parseInt(req.params.id, 10);
    if (isNaN(pacoteId)) {
        return res.status(400).send('ID inválido');
    }

    const sql = 'SELECT imagem FROM pacote WHERE id_pacote = ?';

    db.query(sql, [pacoteId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imagem:', err);
            return res.status(500).send('Erro ao buscar imagens');
        }

        const imagens = results.map((row) => {
            if (row.imagem && Buffer.isBuffer(row.imagem)) {
                return `data:image/jpeg;base64,${Buffer.from(row.imagem).toString('base64')}`;
            }
            return null;
        }).filter(Boolean); // Remove valores `null`

        if (imagens.length === 0) {
            return res.status(404).send('Nenhuma imagem encontrada para este pacote');
        }

        res.json(imagens); // Retorna uma lista de URLs/Base64
    });
});


//TABELA PACOTE - UPDATE
router.put('/api/pacote/:id_pacote', (req, res) => {
    const id = req.params.id_pacote; 
    const { titulo, imagem, descricao, preco } = req.body; 

    if (!titulo || !imagem || !descricao || !preco) {
        return res.status(400).send('Todos os campos (titulo, imagem, descricao, preco) são obrigatórios.');
    }
    var sql = 'UPDATE pacote SET titulo = ?, imagem =  ?, descricao = ?, preco = ? WHERE id_pacote = ?';

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

//TABELA COMPRA - Post
router.post('/api/compra', (req, res) => {
    const compra = req.body;
    console.log(compra);
    const query = `insert into compra (fk_Usuario_Id_Usuario, fk_Pacote_Id_Pacote) values ('${compra.id_pacote}','${compra.id_usuario}')`; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        res.json(results);
    });
});

router.post('/api/compra', (req, res) => {
    const compra = req.body;
    const query = 'INSERT INTO compra (fk_Usuario_Id_Usuario, fk_Pacote_Id_Pacote) VALUES (?, ?)';
    db.query(query, [compra.id_usuario, compra.id_pacote], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados');
            return;
        }
        res.status(201).json({ message: 'Compra realizada com sucesso!', id: results.insertId });
    });
});

//TABELA COMPRA - realizar compra
router.get('/api/compra/preparar/:id_pacote/:id_usuario', (req, res) => {
    const { id_pacote, id_usuario } = req.params;

    const sqlPacote = 'SELECT id_pacote, titulo, preco FROM pacote WHERE id_pacote = ?';
    const sqlUsuario = 'SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ?';

    db.query(sqlPacote, [id_pacote], (errPacote, pacote) => {
        if (errPacote || pacote.length === 0) {
            console.error('Erro ao buscar pacote:', errPacote || 'Nenhum pacote encontrado');
            return res.status(404).send('Pacote não encontrado');
        }

        db.query(sqlUsuario, [id_usuario], (errUsuario, usuario) => {
            if (errUsuario || usuario.length === 0) {
                console.error('Erro ao buscar usuário:', errUsuario || 'Nenhum usuário encontrado');
                return res.status(404).send('Usuário não encontrado');
            }

            res.json({ pacote: pacote[0], usuario: usuario[0] });
        });
    });
});

app.use('/Images', express.static('imagens'));

app.use(router);

//Escuta a porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})


