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
    let preco = "";

    //Interage com a lista de objetos do arquivo dados.js
    for (let destino of destinos) {
        titulo = destino.titulo.toLowerCase()
        descricao = destino.descricao.toLowerCase()
        tags = destino.tags.toLowerCase()
        //Se houver um objeto condizente com o input de pesquisa, ele cria o objeto e mostra na página html
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa) ) {
            resultado += `<div class="sessao">
            <h2>${destino.titulo}</h2><br>
            <div class="image">
                <img class="img" src=Images/${destino.imagem} alt="Imagem-destino">
            </div>
            <br>
            <div class="descricao">
            <p>${destino.descricao}</p>
            </div> <br>
            </div>`   
        }
    }
    if (!resultado){
        resultado = "<p>Nenhum resultado correspondente à pesquisa foi encontrado!</p>"
    }

    section.innerHTML = resultado //Substitui elementos no arquivo html

}