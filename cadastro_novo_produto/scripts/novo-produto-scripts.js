document.addEventListener('DOMContentLoaded', function() {  //Checa se o documento terminou de carregar
    console.log('novo-produto-scripts.js is running!');  //imprime mensagem
    const form = document.querySelector('form'); //procura pelo 1º formulário
    console.log('Formularios:', form); // checa se o fomrulário existe

    if (form) { // verifica se o form não é nulo
        form.addEventListener('submit', function(event) { //Monitora um submit
            event.preventDefault(); //impede o envio automatico
            console.log('Envento de envio de formulário disparado!'); // checa se o evento foi disparado
            if (validaForm()) { // chama a função de validação (abixo)
                alert('Dados salvos com sucesso!');
            }
        });
    } else {
        console.error('Form element not found!'); // mensagem de erro de Formulário não encontrado
    }

    // Entradas do formulário
    const codigoInput = document.getElementById('codigo');
    const descricaoInput = document.getElementById('descricao');
    const unidadeInput = document.getElementById('unidade');
    const precoCompraInput = document.getElementById('preco-compra');
    const margemInput = document.getElementById('margem');
    const precoVendaInput = document.getElementById('preco-venda');
    const precoPrazoInput = document.getElementById('preco-prazo');
    const codigoFornecedorInput = document.getElementById('codigo-fornecedor');
    const fornecedorInput = document.getElementById('fornecedor');
    const estoqueMinimoInput = document.getElementById('estoque-minimo');
    const estoqueAtualInput = document.getElementById('estoque-atual');
    const estoqueMaximoInput = document.getElementById('estoque-maximo');
    const loteInput = document.getElementById('lote');
    const dataValidadeInput = document.getElementById('data-validade');

    // Mensagens de erro 
    const codigoError = mensagemErro(codigoInput); // chama a função createrror
    const descricaoError = mensagemErro(descricaoInput);
    const unidadeError = mensagemErro(unidadeInput);
    const precoCompraError = mensagemErro(precoCompraInput);
    const margemError = mensagemErro(margemInput);
    const precoVendaError = mensagemErro(precoVendaInput);
    const precoPrazoError = mensagemErro(precoPrazoInput);
    const codigoFornecedorError = mensagemErro(codigoFornecedorInput);
    const fornecedorError = mensagemErro(fornecedorInput);
    const estoqueMinimoError = mensagemErro(estoqueMinimoInput);
    const estoqueAtualError = mensagemErro(estoqueAtualInput);
    const estoqueMaximoError = mensagemErro(estoqueMaximoInput);
    const loteError = mensagemErro(loteInput);
    const dataValidadeError = mensagemErro(dataValidadeInput);

    function validaForm() {
        let ehValido = true;

        ehValido = validacaoRequired(codigoInput, codigoError) && ehValido;
        ehValido = validacaoRequired(descricaoInput, descricaoError) && ehValido;
        ehValido = validacaoRequired(unidadeInput, unidadeError) && ehValido;
        ehValido = validacaoRequired(precoCompraInput, precoCompraError) && ehValido;
        ehValido = validacaoNumero(precoCompraInput, precoCompraError) && ehValido;
        ehValido = validacaoRequired(margemInput, margemError) && ehValido;
        ehValido = validacaoNumero(margemInput, margemError) && ehValido;
        ehValido = validacaoRequired(precoVendaInput, precoVendaError) && ehValido;
        ehValido = validacaoNumero(precoVendaInput, precoVendaError) && ehValido;
        ehValido = validacaoRequired(precoPrazoInput, precoPrazoError) && ehValido;
        ehValido = validacaoNumero(precoPrazoInput, precoPrazoError) && ehValido;
        ehValido = validacaoRequired(codigoFornecedorInput, codigoFornecedorError) && ehValido;
        ehValido = validacaoRequired(fornecedorInput, fornecedorError) && ehValido;
        ehValido = validacaoRequired(estoqueMinimoInput, estoqueMinimoError) && ehValido;
        ehValido = validacaoInteiro(estoqueMinimoInput, estoqueMinimoError) && ehValido;
        ehValido = validacaoNaoNegativo(estoqueMinimoInput, estoqueMinimoError) && ehValido;
        ehValido = validacaoRequired(estoqueAtualInput, estoqueAtualError) && ehValido;
        ehValido = validacaoInteiro(estoqueAtualInput, estoqueAtualError) && ehValido;
        ehValido = validacaoNaoNegativo(estoqueAtualInput, estoqueAtualError) && ehValido;
        ehValido = validacaoRequired(estoqueMaximoInput, estoqueMaximoError) && ehValido;
        ehValido = validacaoInteiro(estoqueMaximoInput, estoqueMaximoError) && ehValido;
        ehValido = validacaoNaoNegativo(estoqueMaximoInput, estoqueMaximoError) && ehValido;
        ehValido = validacaoEstoqMaxMin(estoqueMinimoInput, estoqueMaximoInput, estoqueMaximoError) && ehValido;
        ehValido = validacaoRequired(loteInput, loteError) && ehValido;
        ehValido = validacaoRequired(dataValidadeInput, dataValidadeError) && ehValido;
        ehValido = validacaoData(dataValidadeInput, dataValidadeError) && ehValido;
        ehValido = validacaoDataFutura(dataValidadeInput, dataValidadeError) && ehValido;

        return ehValido;
    }

    function mensagemErro(entrada) {
        const mensErro = document.createElement('span'); //cria um elemento do tipo span
        mensErro.className = 'error-message'; //adiciona classe no elemento
        entrada.parentNode.appendChild(mensErro); //adiciona o elemento criado ao elemento pai
        return mensErro;
    }

    //Função para validação dos campos obrigatórios
    function validacaoRequired(input, spanErro) {
        if (!input.value.trim()) { //verifica se o campo está vazio (trim é usado para remover os espaços)
            mensErro(input, spanErro, 'Campo é obrigatório.');//chama a função mensErro
            return false;
        } else {
            escondeErro(input, spanErro);
            return true;
        }
    }

    //Função para validação dos campos numericos
    function validacaoNumero(entrada, spanErro) {
        if (isNaN(parseFloat(entrada.value)) || !isFinite(entrada.value)) {  //verifica se foi digitado um Não Número (IsNaN(NaN)=true) e verifica se o numero não é infinito
            mensErro(entrada, spanErro, 'Deve ser um número válido.');
            return false;
        } else if (parseFloat(entrada.value) < 0) { // verifica se é menor que 0 (zero). ParseFloat converte a entrada para decimal
            mensErro(entrada, spanErro, 'Não pode ser um valor negativo.');
            return false;
        }
         else {
            escondeErro(entrada, spanErro);
            return true;
        }
    }

    //Função para validação de numeros inteiros
    function validacaoInteiro(entrada, spanErro) {
        if (!Number.isInteger(Number(entrada.value))) {
            mensErro(entrada, spanErro, 'Deve ser um número inteiro.');
            return false;
        } else {
            escondeErro(entrada, spanErro);
            return true;
        }
    }

    //Função para validação de numeros não negativos
    function validacaoNaoNegativo(input, spanErro) {
        if (Number(input.value) < 0) {
            mensErro(input, spanErro, 'Não pode ser um valor negativo.');
            return false;
        } else {
            escondeErro(input, spanErro);
            return true;
        }
    }

    //Função para validação do estoque minimo/maximo
    function validacaoEstoqMaxMin(minInput, maxInput, spanErro) {
        if (Number(maxInput.value) < Number(minInput.value)) {  //verifica se o mínimo é maior que o máximo
            mensErro(maxInput, spanErro, 'Estoque máximo deve ser maior ou igual ao mínimo.');
            return false;
        } else {
            escondeErro(maxInput, spanErro);
            return true;
        }
    }

    //Função para validação da data de validade
    function validacaoData(input, spanErro) {
        if (isNaN(Date.parse(input.value))) { // verifica se o input é um NaN | Datwe.parse converte o input (str) para formato data
            mensErro(input, spanErro, 'Data inválida.');
            return false;
        } else {
            escondeErro(input, spanErro);
            return true;
        }
    }

    //Função para validação da data de validade (se é menor que o dia atual)
    function validacaoDataFutura(input, spanErro) {
        const dataInformada = new Date(input.value); //cria um obj com a data informada
        const dataAtual = new Date(); // cria outro obj com a data atual
        dataAtual.setHours(0, 0, 0, 0);

        if (dataInformada < dataAtual) {
            mensErro(input, spanErro, 'Produto vencido ou data incorreta!');
            return false;
        } else {
            escondeErro(input, spanErro);
            return true;
        }
    }


    // função para imprimir mensagem de erro abaixo do campo inválido do formulário
    function mensErro(entrada, spanErro, mensagem) {
        entrada.classList.add('invalid'); //adiciona uma classe "invalid" no elemento input
        spanErro.textContent = mensagem; //Inseri o texto dos parametros da função no elemento span <span> mensagem </span>
        spanErro.style.display = 'block'; //seta display blaock para o elemento span(torna-o visível)        
    }

    function escondeErro(entrada, spanErro) {
        entrada.classList.remove('invalid'); // remove a classe 'invalid' do span
        spanErro.style.display = 'none';  // altera o display do span para none (esconde)     
    }


    // Configura uma escuta para verificar se um campo de inpu foi selecionado. se sim, chama a função "escondeErro()"
    codigoInput.addEventListener('focus', () => escondeErro(codigoInput, codigoError));
    descricaoInput.addEventListener('focus', () => escondeErro(descricaoInput, descricaoError));
    unidadeInput.addEventListener('focus', () => escondeErro(unidadeInput, unidadeError));
    precoCompraInput.addEventListener('focus', () => escondeErro(precoCompraInput, precoCompraError));
    margemInput.addEventListener('focus', () => escondeErro(margemInput, margemError));
    precoVendaInput.addEventListener('focus', () => escondeErro(precoVendaInput, precoVendaError));
    precoPrazoInput.addEventListener('focus', () => escondeErro(precoPrazoInput, precoPrazoError));
    codigoFornecedorInput.addEventListener('focus', () => escondeErro(codigoFornecedorInput, codigoFornecedorError));
    fornecedorInput.addEventListener('focus', () => escondeErro(fornecedorInput, fornecedorError));
    estoqueMinimoInput.addEventListener('focus', () => escondeErro(estoqueMinimoInput, estoqueMinimoError));
    estoqueAtualInput.addEventListener('focus', () => escondeErro(estoqueAtualInput, estoqueAtualError));
    estoqueMaximoInput.addEventListener('focus', () => escondeErro(estoqueMaximoInput, estoqueMaximoError));
    loteInput.addEventListener('focus', () => escondeErro(loteInput, loteError));
    dataValidadeInput.addEventListener('focus', () => escondeErro(dataValidadeInput, dataValidadeError));
});