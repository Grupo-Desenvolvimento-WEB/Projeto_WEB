//Para Imagem:
const imgInput = document.getElementById('img');
const preview = document.getElementById('preview');

imgInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block'; // Mostra a imagem
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
});

//Para area de texto descrição:
const descricaoInput = document.getElementById('descricao');

descricaoInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
});

//Para input Preço
const precoInput = document.getElementById('preco');

// Evento para formatar o preço conforme o usuário digita
precoInput.addEventListener('input', function () {
    let value = precoInput.value;
    value = value.replace(/\D/g, '');
    if (value === '') {
        precoInput.value = '';
        return;
    }
    // const formattedValue = new Intl.NumberFormat('pt-BR', {
    //     style: 'currency',
    //     currency: 'BRL',
    // }).format(value / 100);

});

//Botão para abrir o formulário
function showForm() {
    const formDiv = document.querySelector('.adicionarPacote');

    if (formDiv.classList.contains('show')) {
        formDiv.classList.remove('show');
        setTimeout(() => (formDiv.style.display = 'none'), 300);
    } else {
        formDiv.style.display = 'block';
        setTimeout(() => formDiv.classList.add('show'), 0);
    }
}


//Para criar pacotes

const salvar = async () => {
    console.log('entrou no salvar');

    var titulo = document.getElementById('titulo').value;
    var imagem = document.getElementById('img').value;
    var descricao = document.getElementById('descricao').value;
    var preco = document.getElementById('preco').value;

    var pacote = {
        titulo: titulo,
        imagem: imagem,
        descricao: descricao,
        preco: preco
    };

    console.log(JSON.stringify(pacote));
    const response = await fetch(`http://localhost:3000/api/pacote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pacote),
    });
    const result = await response.json();
    console.log(result);
}

//Teste console
const teste = async () => {
    const response = await fetch('http://localhost:3000/api/pacote');
    const pacotes = await response.json();
    console.log(pacotes);

    pacotes.forEach(Pacote => {
        console.log('ID:', Pacote.id_pacote);
        console.log('Título:', Pacote.titulo);
        console.log('Preço:', Pacote.preco);
        console.log('Número de Compras:', Pacote.num_compras);
    });
}

//Atualiza a tabela
const listar = async () => {
    const response = await fetch(`http://localhost:3000/api/pacote`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log("entrou no get")
    const result = await response.json();

    console.log(result);

    const tabelaPacotes = document.getElementById('pacotes');
    result.forEach((pacote, index) => {
        var row = tabelaPacotes.insertRow(index + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = pacote.id_pacote;
        cell2.innerHTML = pacote.titulo;
        cell3.innerHTML = `<td class="descricao"> ${pacote.descricao}<td>`
        cell4.innerHTML = `R$ ${parseFloat(pacote.preco).toFixed(2).replace('.', ',')}`;
        cell5.innerHTML = pacote.num_compras;
        cell6.innerHTML = `<button class="edt_del" onclick="editar(${pacote.id_pacote})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            Editar</button>
                           <button class="edt_del" onclick="excluir(${pacote.id_pacote})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                            </svg>
                            Excluir</button>`;

    });
}

//Funções para os botões
const editar = async (id_pacote) => {
    console.log("Entrou na função editar");
    console.log(id_pacote);

    const pacote = await fetch(`http://localhost:3000/api/pacote/${id_pacote}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!pacote) {
        console.error(`Pacote com ID ${id_pacote} não encontrado`);
        return;
    }
    const existingEditor = document.querySelector('.containerEdt');
    const openEditar = document.querySelector('.open-popup-btn');
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('.overlay');

    openEditar.addEventListener('click', () => {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    if (existingEditor) {
        existingEditor.remove();
    }

    const row = document.createElement('div');
    row.innerHTML = `
        <div class="containerEdt">
            <h3>Editar Pacote</h3>
            <label for="edtImagem">Imagem:</label>
            <img id="preview" style="display: none;">
            <input type="file" id="edtImagem" accept="image/*" hidden value="${pacote.imagem}">
            <label for="edtTitulo">Título:</label>
            <input type="text" id="edtTitulo" value="${pacote.titulo}">
            <label for="edtDescricao">Descrição:</label>
            <textarea id="edtDescricao">${pacote.descricao}</textarea>
            <label for="edtPreco">Preço:</label>
            <input type="text" id="edtPreco" value="${pacote.preco}">
            <label for="edtNumCompras">Nº de Usuários que Compraram:</label>
            <input type="number" id="edtNumCompras" value="${pacote.num_compras}" disabled>
            <button onclick="salvarEdicao(${id_pacote})">Salvar</button>
            <button onclick="cancelarEdicao()">Cancelar</button>
        </div>
    `;
    const tabelaPacotes = document.getElementById('pacotes');
    tabelaPacotes.parentElement.appendChild(row);
};

// Função para salvar as alterações
const salvarEdicao = async (id_pacote) => {
    const titulo = document.getElementById('edtTitulo').value;
    const imagem = document.getElementById('edtImagem').value;
    const descricao = document.getElementById('edtDescricao').value;
    const preco = document.getElementById('edtPreco').value;

    const data = { titulo, imagem, descricao, preco };

    try {
        const response = await fetch(`http://localhost:3000/api/pacote/${id_pacote}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Pacote atualizado com sucesso!");
            location.reload(); // Atualiza a tabela
        } else {
            console.error("Erro ao atualizar pacote");
        }
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
    }
};

// Função para cancelar a edição
const cancelarEdicao = () => {
    const editor = document.querySelector('.containerEdt');
    if (editor) {
        editor.remove();
    }
};
  //location.href = 'gerenciamentopacotes.html?id=' + id_pacote;

const excluir = async (id_pacote) => {
    console.log("chamou o excluir");
    console.log(id_pacote);
    const response = await fetch(`http://localhost:3000/api/pacote/${id_pacote}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const result = await response.json();
    console.log(result);
    console.log("apagado com sucesso")
    // location.href = 'gerenciamentopacotes.html?'
}
listar();
teste();


