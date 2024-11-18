//DESCOBRIR A BANDEIRA DO CARTÃO
document.getElementById('first').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');   // Input Card só aceita números
});

document.getElementById('first').addEventListener('input', function () {
    const cardNumber = this.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    const cardLogo = document.getElementById('cardLogo');

    let logoSrc = '';

    // Expressões regulares para detectar a bandeira do cartão
    const cardPatterns = {
        'visa': /^4/,                  // Visa começa com 4
        'mastercard': /^5[1-5]/,       // MasterCard começa com 51 a 55
        'elo': /^6/,                   // Elo começa com 6

    };

    // Detecta a bandeira com base no padrão
    for (const [brand, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            logoSrc = `images/${brand}.png`; // Caminho para as imagens das bandeiras
            document.getElementById("cardLogo").style.display = "static";
            break;
        }
    }

    // Define a imagem do logo do cartão
    cardLogo.src = logoSrc || ''; // Se não detectar bandeira, limpa a imagem

});


document.getElementById('name').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');  //Input Name só aceita letras
    this.value = this.value.toUpperCase(); 
});

document.getElementById('expiry').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');   // Input Card só aceita números
});

document.getElementById('id').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');   // Input Card só aceita números
});

document.getElementById('csv').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');   // Input Card só aceita números
});


const confirmarCompra = async (id_pacote, id_usuario) => {
    const response = await fetch(`http://localhost:3000/api/compra/preparar/${id_pacote}/10`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        console.error(`Pacote com ID ${id_pacote} ou Usuario ${id_usuario} não encontrados: ${response.statusText}`);
        return;
    }
    console.log("pagamento realizado com sucesso!")

    const compra = await response.json(); //aq para o usuario

    const popup = document.querySelector('.popup'); 
    const overlay = document.querySelector('.overlay');
    const openpopup = document.getElementById('submit-btn');
    
    openpopup.addEventListener('click', ()=> {

            console.log(compra)
            popup.style.display = 'block';
            overlay.style.display = 'block';

            document.querySelector('.containerEdt').innerHTML = `
                <div class="confirmarCompra">
                    <h2>Confirmar Compra:</h2>
                    <div id="usuarioId"> Id Usuário: ${id_usuario}</div><hr>
                    <p>Usuario: ${compra.nome}</p>
                    <hr>
                    <p>Email: ${compra.email}</p>
                    <hr>
                    <br>
                    <h1> Deseja confirmar a compra do pacote: </h1>
                    <div id="pacoteId"> Id Pacote: ${id_pacote}</div><hr>
                    <p>Título: ${compra.titulo}</p>
                    <hr>
                    <p>Preço: ${compra.preco}
                    <hr>
                    <div class="botoes" style="display: flex;">
                        <button class="sim" onclick="finalizarCompra(${id_pacote}, ${id_usuario})"> Sim </button>
                        <button class="não" onclick="cancelar()">Não</button>
                    </div>    
                </div>
    `;
    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
    console.log(response);
}


    );}

const finalizarCompra = async (id_pacote, id_usuario) => {
    var compra = {
        pacote: id_pacote,
        usuario: id_usuario,
    };

    console.log(JSON.stringify(compra));

    try {
        const response = await fetch(`http://localhost:3000/api/compra`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(compra),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Compra finalizada com sucesso!");
            location.reload();
        } else {
            console.error("Erro ao finalizar a compra:", result.message || result);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
};
    

