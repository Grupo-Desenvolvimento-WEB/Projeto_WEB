function adm(){
    document.getElementById('adm').style = `display: block;`
    return;
}

console.log('teste')

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o container para os cards
    const container = document.querySelector('.right');

    // Limpa o container antes de gerar os cards
    container.innerHTML = '<p>Carregando pacotes...</p>';

    // Faz a requisição para a API
    
    fetch('http://localhost:3000/api/pacote')
.then(response => {
    if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
})
.then(pacotes => {
    console.log('Pacotes recebidos:', pacotes); // Adicionado para depuração
    container.innerHTML = ''; // Limpa qualquer mensagem anterior

    if (pacotes.length === 0) {
        container.innerHTML = '<p>Nenhum pacote disponível no momento.</p>';
        return;
    }
    if (pacotes.imagem) {
        console.log("BLOB recebido:", pacotes.imagem); // Certifique-se de que isso exibe dados binários
        const imagemBase64 = Buffer.from(pacotes.imagem).toString('base64');
        pacotes.imagem = `data:image/jpeg;base64,${imagemBase64}`;
    } else {
        console.warn("Campo 'imagem' está vazio ou nulo para o pacote:", pacotes.id_pacote);
    }
    

    pacotes.forEach(pacote => {
        const card = `
            <div class="card mb-5" style="width: 16rem;">
                <img src="${pacote.imagemBase64}" id="img" class="card-img-top" alt="${pacote.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${pacote.titulo}</h5>
                    <p class="card-text">${pacote.descricao}</p>
                    <a href="#" class="btn btn-warning" onclick="redirecionarParaDetalhes(${pacote.id_pacote})">Veja os preços</a>
                </div>
            </div>
        `;
       

        container.innerHTML += card;
    });
})
.catch(error => {
    console.error('Erro ao carregar pacotes:', error);
    container.innerHTML = '<p>Erro ao carregar pacotes. Tente novamente mais tarde.</p>';
});
});



// Função para redirecionar para os detalhes do pacote
function redirecionarParaDetalhes(id) {
    location.href = `detalhes.html?id=${id}`;
}