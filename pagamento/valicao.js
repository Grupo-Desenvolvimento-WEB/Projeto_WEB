const card = document.getElementById('first').value; 
const name = document.getElementById('name').value;
const month = document.getElementById('month').value;
const year = document.getElementById('year').value;
const csv = document.getElementById('csv').value;

const form = document.querySelector('form')
const input = document.getElementsByTagName('input');

function validarFormulario() {
    //document.getElementById('nome').value = 'Prof. Cleverson';
    const nome = document.getElementById('nome').value;
    if (nome === '') {
        document.getElementById('nome').style = 'border: 2px solid #ff0000;';
        alert('hey, you have to fill something buddy.');
        return false;
    }

    console.log(nome);
    console.log("chamou validarFormulario");
    return true;
}

form.addEventListener("submit", async (e) => {
    if (card.value === "") {
        alert("todos os campos são obrigatórios")
    }
    //bloqueia a atualiação da página html
    e.preventDefalt();


    console.log("oi");
    alert("oi")
    
})