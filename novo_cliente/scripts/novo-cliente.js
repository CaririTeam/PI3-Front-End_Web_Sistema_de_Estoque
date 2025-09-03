document.addEventListener('DOMContentLoaded', function () {
    console.log('novo-produto-scripts.js is running!');
    const form = document.getElementById('form-principal');
    console.log('Formulário:', form);

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Evento de envio de formulário disparado!');

            // monta objeto com os dados
            const novosDados = {
                codigo: form.codigo.value,
                nome: form.descricao.value,
                cpf: form.precoCompra.value,
                rua: form.margem.value,
                numero: form.precoVenda.value,
                bairro: form.precoPrazo.value,
                cidade: form.codigoFornecedor.value,
                pontoRef: form.fornecedor.value,
                email: form.estoqueMinimo.value,
                telefone: form.estoqueAtual.value
            };

            try {
                // envia via fetch para sua API
                const response = await fetch("http://localhost:3000/clientes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novosDados)
                });

                if (!response.ok) {
                    throw new Error(`Erro ao salvar: ${response.status}`);
                }

                const result = await response.json();
                console.log("Resposta da API:", result);

                alert("Dados enviados com sucesso!");
                window.location.href = "../../tela_clientes/src/clientes.html";
                form.reset();

            } catch (error) {
                console.error("Erro no fetch:", error);
                alert("Falha ao enviar os dados. Tente novamente.");
            }
        });
    } else {
        console.error("Form element not found!");
    }
});
