//Função botão pesquisar
function pesquisar() {
    console.log("deu certo"); //Teste

    let section = document.getElementById("resultado-pesquisa") //Pega o dado com o id e armazena em uma variável

    let campoPesquisa = document.getElementById("campo-pesquisa").value //Armazena o resultado do input

    if (!campoPesquisa) {
        section.innerHTML = "<p>Insira o conteúdo no campo de pesquisa!</p>"
        return // Não retorna nada se o campo estiver vazio
    }

    campoPesquisa = campoPesquisa.toLowerCase()

    let resultado = ""; //Cria uma string vazia para exibir os resultados da pesquisa
    let titulo = "";
    let descricao = "";
    let tags = "";

    //Interage com a lista de objetos do arquivo dados.js
    for (let destino of destinos) {
        titulo = destino.titulo.toLowerCase()
        descricao = destino.descricao.toLowerCase()
        tags = destino.tags.toLowerCase()
        //Se houver um objeto condizente com o input de pesquisa, ele cria o objeto e mostra na página html
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa) ) {
            resultado += `
            <h1>${destino.titulo}</h1>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src=${destino.imagem} alt="Imagem-destino">
            </div></div>
            <br>
            <div class="descricao">
            <p>${destino.descricao}</p>
            </div> `

            
        }

    }

    if (!resultado){
        resultado = "<p>Nenhum resultado encontrado!</p>"
    }

    section.innerHTML = resultado //Substitui elementos no arquivo html

}


