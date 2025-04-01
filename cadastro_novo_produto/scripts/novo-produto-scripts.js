// novo-produto-scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    // Inputs
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

    // Error spans
    const codigoError = createErrorSpan(codigoInput);
    const descricaoError = createErrorSpan(descricaoInput);
    const unidadeError = createErrorSpan(unidadeInput);
    const precoCompraError = createErrorSpan(precoCompraInput);
    const margemError = createErrorSpan(margemInput);
    const precoVendaError = createErrorSpan(precoVendaInput);
    const precoPrazoError = createErrorSpan(precoPrazoInput);
    const codigoFornecedorError = createErrorSpan(codigoFornecedorInput);
    const fornecedorError = createErrorSpan(fornecedorInput);
    const estoqueMinimoError = createErrorSpan(estoqueMinimoInput);
    const estoqueAtualError = createErrorSpan(estoqueAtualInput);
    const estoqueMaximoError = createErrorSpan(estoqueMaximoInput);
    const loteError = createErrorSpan(loteInput);
    const dataValidadeError = createErrorSpan(dataValidadeInput);

    let validationTimeout;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Formulário válido! (Simulação de envio)'); // Substitua por envio real do formulário
        }
    });

    function validateForm() {
        let isValid = true;

        isValid = validateRequired(codigoInput, codigoError) && isValid;
        isValid = validateRequired(descricaoInput, descricaoError) && isValid;
        isValid = validateRequired(unidadeInput, unidadeError) && isValid;
        isValid = validateRequired(precoCompraInput, precoCompraError) && isValid;
        isValid = validateNumber(precoCompraInput, precoCompraError) && isValid;
        isValid = validateRequired(margemInput, margemError) && isValid;
        isValid = validateNumber(margemInput, margemError) && isValid;
        isValid = validateRequired(precoVendaInput, precoVendaError) && isValid;
        isValid = validateNumber(precoVendaInput, precoVendaError) && isValid;
        isValid = validateRequired(precoPrazoInput, precoPrazoError) && isValid;
        isValid = validateNumber(precoPrazoInput, precoPrazoError) && isValid;
        isValid = validateRequired(codigoFornecedorInput, codigoFornecedorError) && isValid;
        isValid = validateRequired(fornecedorInput, fornecedorError) && isValid;
        isValid = validateRequired(estoqueMinimoInput, estoqueMinimoError) && isValid;
        isValid = validateInteger(estoqueMinimoInput, estoqueMinimoError) && isValid;
        isValid = validateNonNegative(estoqueMinimoInput, estoqueMinimoError) && isValid;
        isValid = validateRequired(estoqueAtualInput, estoqueAtualError) && isValid;
        isValid = validateInteger(estoqueAtualInput, estoqueAtualError) && isValid;
        isValid = validateNonNegative(estoqueAtualInput, estoqueAtualError) && isValid;
        isValid = validateRequired(estoqueMaximoInput, estoqueMaximoError) && isValid;
        isValid = validateInteger(estoqueMaximoInput, estoqueMaximoError) && isValid;
        isValid = validateNonNegative(estoqueMaximoInput, estoqueMaximoError) && isValid;
        isValid = validateStockMaxMin(estoqueMinimoInput, estoqueMaximoInput, estoqueMaximoError) && isValid;
        isValid = validateRequired(loteInput, loteError) && isValid;
        isValid = validateRequired(dataValidadeInput, dataValidadeError) && isValid;
        isValid = validateDate(dataValidadeInput, dataValidadeError) && isValid;
        isValid = validateFutureDate(dataValidadeInput, dataValidadeError) && isValid;


        return isValid;
    }

    function createErrorSpan(inputElement) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        inputElement.parentNode.appendChild(errorSpan);
        return errorSpan;
    }


    function validateRequired(input, errorElement) {
        if (!input.value.trim()) {
            showError(input, errorElement, 'Este campo é obrigatório.');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }

    function validateNumber(input, errorElement) {
        if (isNaN(parseFloat(input.value)) || !isFinite(input.value)) {
            showError(input, errorElement, 'Deve ser um número válido.');
            return false;
        } else if (parseFloat(input.value) < 0) {
            showError(input, errorElement, 'Não pode ser um valor negativo.');
            return false;
        }
         else {
            hideError(input, errorElement);
            return true;
        }
    }

    function validateInteger(input, errorElement) {
        if (!Number.isInteger(Number(input.value))) {
            showError(input, errorElement, 'Deve ser um número inteiro.');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }

    function validateNonNegative(input, errorElement) {
        if (Number(input.value) < 0) {
            showError(input, errorElement, 'Não pode ser um valor negativo.');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }

    function validateStockMaxMin(minInput, maxInput, errorElement) {
        if (Number(maxInput.value) < Number(minInput.value)) {
            showError(maxInput, errorElement, 'Estoque máximo deve ser maior ou igual ao mínimo.');
            return false;
        } else {
            hideError(maxInput, errorElement);
            return true;
        }
    }

    function validateDate(input, errorElement) {
        if (isNaN(Date.parse(input.value))) {
            showError(input, errorElement, 'Data inválida.');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }

    function validateFutureDate(input, errorElement) {
        const selectedDate = new Date(input.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showError(input, errorElement, 'A data de validade deve ser futura.');
            return false;
        } else {
            hideError(input, errorElement);
            return true;
        }
    }


    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        clearTimeout(validationTimeout);
    }

    function hideError(input, errorElement) {
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
        clearTimeout(validationTimeout);
    }


    // Event listeners to clear errors on input focus
    codigoInput.addEventListener('focus', () => hideError(codigoInput, codigoError));
    descricaoInput.addEventListener('focus', () => hideError(descricaoInput, descricaoError));
    unidadeInput.addEventListener('focus', () => hideError(unidadeInput, unidadeError));
    precoCompraInput.addEventListener('focus', () => hideError(precoCompraInput, precoCompraError));
    margemInput.addEventListener('focus', () => hideError(margemInput, margemError));
    precoVendaInput.addEventListener('focus', () => hideError(precoVendaInput, precoVendaError));
    precoPrazoInput.addEventListener('focus', () => hideError(precoPrazoInput, precoPrazoError));
    codigoFornecedorInput.addEventListener('focus', () => hideError(codigoFornecedorInput, codigoFornecedorError));
    fornecedorInput.addEventListener('focus', () => hideError(fornecedorInput, fornecedorError));
    estoqueMinimoInput.addEventListener('focus', () => hideError(estoqueMinimoInput, estoqueMinimoError));
    estoqueAtualInput.addEventListener('focus', () => hideError(estoqueAtualInput, estoqueAtualError));
    estoqueMaximoInput.addEventListener('focus', () => hideError(estoqueMaximoInput, estoqueMaximoError));
    loteInput.addEventListener('focus', () => hideError(loteInput, loteError));
    dataValidadeInput.addEventListener('focus', () => hideError(dataValidadeInput, dataValidadeError));


});
