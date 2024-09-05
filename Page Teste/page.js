//Função botão pesquisar
function pesquisar() {
    console.log("deu certo"); //Teste

    let section = document.getElementById("resultado-pesquisa") //Pega o dado com o id e armazena em uma variável

    let resultado = "" //Cria uma string vazia para exibir os resultados da pesquisa

    //Interage com a lista de objetos do arquivo dados.js
    for (let destino of destinos) {
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
    section.innerHTML = resultado //Substitui elementos no arquivo html

}


