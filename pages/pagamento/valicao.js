//Armazenando os dados da área de pagamento
const card = document.getElementById('first').value; 
const name = document.getElementById('name').value;
const month = document.getElementById('month').value;
const year = document.getElementById('year').value;
const csv = document.getElementById('csv').value;
const form = document.querySelector('form')
const input = document.getElementsByTagName('input');

function validarFormulario() {
    e.preventDefault();
    document.getElementById('name').value;
    const nome = document.getElementById('name').value;
    if (nome === '') {
        document.getElementById('name').style = 'border: 2px solid #ff0000;';
        alert('Todos os campos são obrigatórios!');
        return false;
    }

    console.log(name);
    console.log("chamou validarFormulario");
    return true;
}

form.addEventListener("submit", async (e) => {
    if (card.value === "") {
        alert("todos os campos são obrigatórios")
    }
    //bloqueia a atualiação da página html
    e.preventDefault();


    console.log("oi");
    alert("oi")
    
})

//Api json teste

var express = require('express');
var app = express();
app.use(express.json());
