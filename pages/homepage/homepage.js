// const pegarImagens = async (id_pacote) =>{
//     const response = await fetch(`http://localhost:3000/api/pacote/${id_pacote}/imagens`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         }
//     });
//     if (!response) {
//         console.error(`Pacote com ID ${id_pacote} não encontrado: ${response.statusText}`);
//         return;
//     }
//     console.log("imagens recuperadas")
// }

async function verificarSessao() {
    try {
        const response = await fetch('http://localhost:3000/api/me', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            console.log('erro na autentificação')
            return;
        }

        const data = await response.json();
        alert(data.message);
        //window.location.href = '../index.html';
        
    } catch (err) {
        console.error('Erro ao verificar sessão:', err);
    }
}


console.log('teste')

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.row'); // Seleciona a linha onde os cards serão adicionados

    container.innerHTML = '<p>Carregando pacotes...</p>';

    fetch('http://localhost:3000/api/pacote')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(pacotes => {
            container.innerHTML = ''; // Limpa qualquer mensagem anterior

            if (pacotes.length === 0) {
                container.innerHTML = '<p>Nenhum pacote disponível no momento.</p>';
                return;
            }

            pacotes.forEach(pacote => {
                const card = `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card h-100">
                            <img src="/Imagens/${pacote.imagem}" class="card-img-top" alt="${pacote.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${pacote.titulo}</h5>
                                <p class="card-text">${pacote.descricao}</p>
                                <a href="#" class="btn btn-warning" onclick="redirecionarParaDetalhes(${pacote.id_pacote})">Veja os preços</a>
                            </div>
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