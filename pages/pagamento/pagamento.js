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



