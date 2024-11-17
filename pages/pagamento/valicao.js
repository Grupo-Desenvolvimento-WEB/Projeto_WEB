//Armazenando os dados da área de pagamento
const card = document.getElementById('first').value; 
const name = document.getElementById('name').value;
const month = document.getElementById('month').value;
const year = document.getElementById('year').value;
const csv = document.getElementById('csv').value;
const form = document.querySelector('form')
const input = document.getElementsByTagName('input');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let valid = true;

        if (month < 1 || month > 12) {
            alert("Valor 'Mês' incorreto!");
            valid = false;
        }
        
        if (year < getFullYear()) {
            alert("Por favor, insira um email válido.");
            valid = false;
        }
    
    })})


function validarFormulario() {
    e.preventDefault();
    document.getElementById('name').value;
    const nome = document.getElementById('name').value;
    if (nome === '') {
        document.getElementById('name').style = 'border: 2px solid #ff0000;';
        alert('Todos os campos são obrigatórios!');
        return false;
    }

    console.log(nome);
    console.log("chamou validarFormulario");
    return true;
}


