const pacotes = []

// Função para atualizar a tabela
function updateTable() {
    const tableBody = document.querySelector('#pacotes tbody');
    tableBody.innerHTML = '';

    packages.forEach((pkg, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pkg.nome}</td>
            <td>R$ ${pkg.preco}</td>
            <td>${pkg.destino}</td>
            <td>${pkg.descricao}</td>
            <td>
                <button onclick="editPackage(${index})">Editar</button>
                <button onclick="deletePackage(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });}