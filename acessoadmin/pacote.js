const pacotes = []

// Função para atualizar a tabela
function updateTable() {
    const tableBody = document.querySelector('#pacotes tbody');
    tableBody.innerHTML = '';

    packages.forEach((pkg, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pkg.name}</td>
            <td>R$ ${pkg.price}</td>
            <td>${pkg.destination}</td>
            <td>${pkg.purchased}</td>
            <td>
                <button onclick="editPackage(${index})">Editar</button>
                <button onclick="deletePackage(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });}