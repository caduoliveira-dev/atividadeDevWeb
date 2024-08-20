let funcionarios = [
    {
        "nome": "Gervásio Duarte",
        "data_de_nascimento": "1970-01-12"
    },
    {
        "nome": "Irene Chaves",
        "data_de_nascimento": "1992-03-20"
    }
];

function calcularIdade(dataNascimento) {
    const hoje = new Date(); // obj date que representa data e hora atual
    const nascimento = new Date(dataNascimento); // obj date a partir a string passada na funcao (data nascimento do func)
    let idade = hoje.getFullYear() - nascimento.getFullYear(); // calcula a idade (hoje - nascimento)
    const mes = hoje.getMonth() - nascimento.getMonth(); // calcula diferença entre os meses (hoje - nascimento)

    // se o mes atual é anterior ao mes de nascimento = n fez aniversario esse ano
    // ou
    // se estamos no mes de aniversario, mas o dia é anterior ao nascimento == n fez aniversario esse ano
    // caso uma das duas seja verdadeira, subtrai a idade por 1
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

function calcularDiasParaAniversario(dataNascimento) {
    const hoje = new Date(); // obj data atual

    // obj q representa proximo aniversario
    // novo obj extraindo mes e dia de nascimento da string passada na funcao (data de aniversario)
    const aniversario = new Date(hoje.getFullYear(), new Date(dataNascimento).getMonth(), new Date(dataNascimento).getDate());
    

    if (aniversario < hoje) { // verifica se o aniversario ja passou esse ano
        aniversario.setFullYear(hoje.getFullYear() + 1); // se ja passou, ajusta a data do aniversario para o prox ano
    }

    
    const diff = aniversario - hoje; // calcula a dif entre o prox niver e a data atual, retorna em milissegundos
    
    //console.log(diff)
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // converte de milessegundos para dias
}

function formatarData(dataNascimento) {
    const data = new Date(dataNascimento); // obj date a partir da string passada
    const dia = String(data.getDate() + 1).padStart(2, '0'); // extrai o dia, adicionando o 0 caso a string n possua 2 dígitos
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // extrai o mes, getMont retorna 0 a 11, onde 0 é janeiro
    const ano = data.getFullYear(); // extrai o ano
    return `${dia}/${mes}/${ano}`; // retorna formatada
}

function ordenarFuncionariosPorAniversario() {

    // func sort para ordenar os func pelo dia q falta para niver
    funcionarios.sort((a, b) => { // passando func de comparação no metodo sort, com dois parametros (a ,b)

        // para cada par a func calcula os dias faltando usando a func calcularDiasParaAniversario
        const diasA = calcularDiasParaAniversario(a.data_de_nascimento);
        const diasB = calcularDiasParaAniversario(b.data_de_nascimento);
        return diasA - diasB; // retorna a diferença entre a e b

        // se A for menor que B, indica que A deve vir antes de B e assim por diante
    });
}

function renderizarFuncionarios(funcionarios) {
    const container = document.getElementById('dados-func'); // seleciona o container onde vai os dados do func

    container.innerHTML = ''; // limpa o container antes de re-renderizar

    ordenarFuncionariosPorAniversario() // ordena os func

    funcionarios.forEach(funcionario => { //forEach para percorrer 'funcionario'

        const div = document.createElement('div'); // cria um elemento div
        div.className = 'funcionario'; // atribui uma classe para estilizar ela melhor no css
        
        const nome = document.createElement('h2'); // cria um elemento h2
        nome.textContent = funcionario.nome; // atribui o nome do funcionario ao h2

        const dataFormatada = formatarData(funcionario.data_de_nascimento); // constante para armazenar a data formatada
        const idade = calcularIdade(funcionario.data_de_nascimento); // constante para armazenar a idade
        const diasParaAniversario = calcularDiasParaAniversario(funcionario.data_de_nascimento); // constante para armazenar os dias

        const detalhes = document.createElement('p'); // cria um elemento p

        // atribui a ele o texto passando as variáveis com template string
        detalhes.textContent = `${dataFormatada} (${idade} anos; faltando ${diasParaAniversario} dias para o aniversário)`;

        div.appendChild(nome); // adicionar o elemento nome a div
        div.appendChild(detalhes); // adicionar o elemento detalhes a div
        container.appendChild(div) // adicionar toda a div no container
    });
}

// Função para adicionar um novo funcionário
function adicionarFuncionario(event) {
    event.preventDefault(); // evita q a pag seja recarregada após o submit

    const nomeInput = document.getElementById('nome');
    const dataNascimentoInput = document.getElementById('data-nascimento');

    const novoFuncionario = {
        nome: nomeInput.value,
        data_de_nascimento: dataNascimentoInput.value
    };

    // add o novo funcionário
    funcionarios.push(novoFuncionario);

    // renderizo a lista
    renderizarFuncionarios(funcionarios);

    // limpo os campos do formn
    nomeInput.value = '';
    dataNascimentoInput.value = '';
}

// evento submit do formulario
const form = document.getElementById('form');
form.addEventListener('submit', adicionarFuncionario);

// renderiza a lista inicialmente
renderizarFuncionarios(funcionarios);
