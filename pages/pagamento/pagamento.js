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


const finalizarCompra = async (id_pacote, id_usuario) => {
    const container = document.querySelector('.confirmarCompra'); // Seleciona a linha onde os cards serão adicionados

    container.innerHTML = '<p>Carregando pacotes...</p>';

    const response = await fetch(`http://localhost:3000/api/compra/preparar/${id_pacote}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response) {
        console.error(`Pacote com ID ${id_pacote} ou Usuario ${id_usuario} não encontrados: ${response.statusText}`);
        return;
    }
    console.log("pagamento realizado com sucesso!")
}

