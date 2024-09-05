
// Criando uma lista de objetos;

let destinos = [
    {
    titulo: "Barramas",
    imagem: "../barramas.jpg",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Rio de Janeiro",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Maceió",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Gramado",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Porto Seguro",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Tokyo",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Irlanda",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Barcelona",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}, 
{
    titulo: "Paris",
    imagem: "../",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia dignissim nulla, eget volutpatn sapien suscipit euismod."
}];

// Função para criar um elemento <img> e adicioná-lo ao DOM
function exibirImagem(destinos) {
    let imagem = document.createElement('img');
    imagem.src = destinos.imagem;
    document.body.appendChild(imagem);
}

// Chamando a função para exibir a imagem
exibirImagem(destinos[0]);
