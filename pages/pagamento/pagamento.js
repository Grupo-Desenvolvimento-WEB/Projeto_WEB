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
function getPacote(id_pacote) {
    const pacoteId = id_pacote || new URLSearchParams(window.location.search).get('id');

    if (!pacoteId) {
        console.error('ID do pacote não encontrado!');
        return null;
    }
    console.log('ID do Pacote:', pacoteId); 
    return pacoteId; 
}

function getUsuario(id_usuario) {
    const usuarioId = id_usuario || new URLSearchParams(window.location.search).get('usuario');

    if (!usuarioId) {
        console.error('ID do usuário não encontrado!');
        return null;
    }
    console.log('ID do Usuario:', usuarioId); 
    return usuarioId; 

}


const confirmarCompra = async (id_pacote, id_usuario) => {
    const response = await fetch(`http://localhost:3000/api/compra/preparar/${getPacote()}/10`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        console.error(`Pacote com ID ${id_pacote} ou Usuario ${id_usuario} não encontrados: ${response.statusText}`);
        return;
    }
    

    const compra = await response.json(); 

    const popup = document.querySelector('.popup'); 
    const overlay = document.querySelector('.overlay');
    const openpopup = document.getElementById('submit-btn');
    
    openpopup.addEventListener('click', ()=> {
            console.log(compra)
            popup.style.display = 'block';
            overlay.style.display = 'block';

            document.querySelector('.popup').innerHTML = `
                <div class="confirmarCompra">
                    <h2>Confirmar Compra:</h2>
                    <div id="usuarioId"> Id Usuário: ${compra.id_usuario}</div><hr>
                    <div>Usuario: ${compra.nome}</div>
                    <hr>
                    <div>Email: ${compra.email}</div>
                    <hr>
                    <br>
                    <h4> Deseja confirmar a compra do pacote: </h4>
                    <div id="pacoteId"> Id Pacote: ${compra.id_pacote}</div><hr>
                    <div>Título: ${compra.titulo}</div>
                    <hr>
                    <div>Preço: ${compra.preco}</div>
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
    console.log('ID do pacote:', id_pacote, 'ID do usuário:', id_usuario);
}


    );}

const finalizarCompra = async (id_pacote, id_usuario) => {
    var compra = {
        pacote: id_pacote,
        usuario: id_usuario,
    };
    window.location.href = '../index.html';
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
            console.log("pagamento realizado com sucesso!")
            //window.location.href = '../index.html'; 
            location.reload();
        } else {
            console.error("Erro ao finalizar a compra:", result.message || result);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
};
const cancelar = () => {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('.overlay');

    popup.style.display = 'none';
    overlay.style.display = 'none';
    
};
    
getPacote()
getUsuario()