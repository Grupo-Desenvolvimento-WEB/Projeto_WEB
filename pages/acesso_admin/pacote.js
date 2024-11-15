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
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value / 100);

    precoInput.value = formattedValue;
});

//Para criar pacotes
const pacotes = []

const salvar = async () => {
    console.log('entrou no salvar');

    var titulo = document.getElementById('titulo').value;
    var descricao = document.getElementById('descricao').value;
    var preco = document.getElementById('preco').value;

    var data = {
        titulo: titulo,
        descricao: descricao,
        preco: preco
    };

    console.log(JSON.stringify(data));
    const response = await fetch(`http://localhost:3000/api/pacote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
}

// Função para atualizar a tabela
function updateTable() {
    const tableBody = document.querySelector('#pacotes tbody');
    tableBody.innerHTML = '';

    packages.forEach((pkg, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<tr>
            <td>${pkg.nome}</td>
            <td>R$ ${pkg.preco}</td>
            <td>${pkg.descricao}</td>
            <td>
                <button onclick="editPackage(${index})">Editar</button>
                <button onclick="deletePackage(${index})">Excluir</button>
            </td>
            <tr>
        `;
        tableBody.appendChild(row);
    });}



    ////////////////////////
    const listar = async () => {
        const response = await fetch(`http://localhost:3000/api/pacotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.json();
        console.log(result);

        const tabelaPacotes = document.getElementById('pacotes');
        result.forEach((pacote, index) => {                
            var row = tabelaPacotes.insertRow(index + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = pacote.titulo;
            cell2.innerHTML = pacote.preco;
            cell3.innerHTML = '<button onclick="carregar('+pacote.titulo+')">Editar</editar>';
            cell4.innerHTML = '<button onclick="excluir('+pacote.titulo+')">Excluir</editar>';
        });
    }
    listar();

    const carregar = (id) => {
        console.log("entrou na função carregar")
        console.log(id);
        location.href = 'gerenciamentopscotes.html?id='+id;
    }

    const excluir = async (id) => {
        console.log("chamou o excluir");
        console.log(id);
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await response.body;
        console.log(result);}