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
const teste = async ()=>{
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
        cell3.innerHTML = pacote.descricao;
        cell4.innerHTML = `R$ ${parseFloat(pacote.preco).toFixed(2).replace('.', ',')}`;
        cell5.innerHTML = pacote.num_compras;
        cell6.innerHTML = `<button onclick="editar(${pacote.id_pacote})">Editar</button>
                           <button onclick="excluir(${pacote.id_pacote})">Excluir</button>`;
    
    });
}

//Funções para os botões
const editar = (id_pacote) => {
    console.log("entrou na função carregar");
    console.log(id_pacote);
    location.href = 'gerenciamentopacotes.html?id=' + id_pacote;
}

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
}
listar();
teste();


