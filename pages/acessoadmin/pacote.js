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