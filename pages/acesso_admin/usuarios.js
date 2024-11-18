
const listar = async () => {
    const response = await fetch(`http://localhost:3000/api/usuario`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log("entrou no get")
    const result = await response.json();

    console.log(result);

    const tabelaUsuarios = document.getElementById('usuarios');
    result.forEach((usuario, index) => {
        var row = tabelaUsuarios.insertRow(index + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = usuario.id_usuario;
        cell2.innerHTML = usuario.nome;
        cell3.innerHTML = usuario.email;

    });
}
listar();