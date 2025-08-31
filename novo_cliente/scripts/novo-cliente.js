
document.addEventListener('DOMContentLoaded', function() {  //Checa se o documento terminou de carregar
    console.log('novo-produto-scripts.js is running!');  //imprime mensagem
    const form = document.getElementById('form-principal'); //procura pelo 1º formulário
    console.log('Formularios:', form); // checa se o fomrulário existe

    if (form) { // verifica se o form não é nulo
        form.addEventListener('submit', function(event) { //Monitora um submit
            event.preventDefault(); //impede o envio automatico
            console.log('Envento de envio de formulário disparado!'); // checa se o evento foi disparado
            

                const novosDados = {
                    codigo : form.codigo.value,
                    nome_completo : form.descricao.value,
                    
                    cpf : form.precoCompra.value,
                    rua : form.margem.value,
                    numero : form.precoVenda.value,
                    bairro : form.precoPrazo.value,
                    cidade : form.codigoFornecedor.value,
                    ponto_ref : form.fornecedor.value,
                    email : form.estoqueMinimo.value,
                    telefone : form.estoqueAtual.value
                    
                };

                const chave = 'clientes_' + String(form.codigo.value);

                localStorage.setItem(chave, JSON.stringify(novosDados));              

                alert('Dados salvos com sucesso!');
                window.location.href = '../../tela_clientes/src/clientes.html';
                form.reset()
               
            
        });
    } else {
        console.error('Form element not found!'); // mensagem de erro de Formulário não encontrado
    }

    
});