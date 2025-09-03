
listarClientes();

async function listarClientes(){
    
    const clientesSalvos = document.getElementById('produtosSalvos');

    try {
        const resposta = await fetch("http://localhost:3000/clientes");

    if (!resposta.ok) {
        throw new Error(`Erro ao buscar clientes. Status: ${resposta.status}`);
    }

    const listaClientes = await resposta.json(); // transforma a resposta em array de objetos

    listaClientes.forEach(cliente => {
        const divContainer = document.createElement('div');
        divContainer.style.display = 'grid';
        divContainer.style.placeItems = 'center';
        divContainer.style.gridTemplateColumns = '1fr 3fr 1fr 1fr 1fr 1fr';
        divContainer.style.margin = '1vh';

        const id = document.createElement('div');
        id.textContent = cliente.id;

        const nome = document.createElement('div');
        nome.textContent = cliente.nome;

        const cpf = document.createElement('div');
        cpf.textContent = cliente.cpf;

        const email = document.createElement('div');
        email.textContent = cliente.email;

        const telefone = document.createElement('div');
        telefone.textContent = cliente.telefone;  
        

        const botaoDiv = document.createElement('button');  
        botaoDiv.textContent = "+ Detalhes";
        botaoDiv.style.background = '#10403b';
        botaoDiv.style.color = 'white';
        botaoDiv.dataset.id = cliente.id;

        botaoDiv.addEventListener('click', (e) => {        
            mostrarDetalhes(e.target.dataset.id);
        });

        divContainer.appendChild(id);
        divContainer.appendChild(nome);
        divContainer.appendChild(cpf);
        divContainer.appendChild(email);
        divContainer.appendChild(telefone);
        divContainer.appendChild(botaoDiv);
        
        clientesSalvos.appendChild(divContainer);
    });

    } catch (erro) {
        console.error("Erro ao buscar dados da API:", erro);
        clientesSalvos.innerHTML = "<p>Não foi possível carregar os produtos.</p>";
    }
}




   
function buscar(){
    const nome = document.getElementById('descricaoLocalizar').value.trim();  //captura o valor do input e remove os espaços

    if(nome === ''){
        alert('Campo de pesquisa vazio!')
        return;
    }

    const produtos = buscarProdutos(nome);


    const produtosSalvos = document.getElementById('produtosSalvos');
    produtosSalvos.innerHTML = '' // limpa a lista

    //criar um cabeçalho
    const cabecalho = document.createElement('div');
    cabecalho.classList.add('cabecalhoProdutos');

    const cod = document.createElement('div');
    cod.textContent = 'Código';
    const desc = document.createElement('div');
    desc.textContent = 'Descricão';
    const estMin = document.createElement('div');
    estMin.textContent = 'Estoque Mínimo';
    const estAtual = document.createElement('div');
    estAtual.textContent = 'Estoque Atual';
    const estMax = document.createElement('div');
    estMax.textContent = 'Estoque Máximo';

    cabecalho.appendChild(cod);
    cabecalho.appendChild(desc);
    cabecalho.appendChild(estMin);
    cabecalho.appendChild(estAtual);
    cabecalho.appendChild(estMax);

    produtosSalvos.appendChild(cabecalho);

    //teste o resultado da pesquisa

    if(produtos.length === 0){
        const buscaVazia = document.createElement('div');
        buscaVazia.textContent = 'Nenhum produto encontrado!';
        buscaVazia.style.margin = '5vw';
        buscaVazia.style.textAlign = 'center';                 
        produtosSalvos.appendChild(buscaVazia);
}
else{
    produtos.forEach(p => {     
        
        const divContainer = document.createElement('div');
        divContainer.style.display = 'grid';
        divContainer.style.placeItems = 'center';
        divContainer.style.gridTemplateColumns = '1fr 3fr 1fr 1fr 1fr 1fr';        
        divContainer.style.margin = '1vh';

        const codigoDiv = document.createElement('div');
        codigoDiv.textContent = `${p.codigo}`;     

        const descricaoDiv = document.createElement('div');
        descricaoDiv.textContent = `${p.descricao}`;

        const estoqueMinDiv = document.createElement('div');
        estoqueMinDiv.textContent = `${p.estoque_minimo}`;

        const estoqueAtualDiv = document.createElement('div');
        estoqueAtualDiv.textContent = `${p.estoque_atual}`;

        const estoqueMaxDiv = document.createElement('div');
        estoqueMaxDiv.textContent = `${p.estoque_maximo}`;
        
        const botaoDiv = document.createElement('button');
        botaoDiv.textContent = "+ Detalhes";
        botaoDiv.style.background = '#10403b';
        botaoDiv.style.color = 'white';
        botaoDiv.dataset.codigo = p.codigo;

        botaoDiv.addEventListener('click',() =>{   // botão de + detalhes
            mostrarDetalhes(p.codigo);
        })
        
        //adiciona os filhos ao container pai
        divContainer.appendChild(codigoDiv);
        divContainer.appendChild(descricaoDiv);
        divContainer.appendChild(estoqueMinDiv);
        divContainer.appendChild(estoqueAtualDiv);
        divContainer.appendChild(estoqueMaxDiv);
        divContainer.appendChild(botaoDiv);

        //adiciona o container pai a div do HTML
        produtosSalvos.appendChild(divContainer); 


    });
}

}

function buscarProdutos(nome){
    const resultados = [];

    for(let i=0; i<localStorage.length; i++){
        const chave = localStorage.key(i);

        if(chave.startsWith('clientes_')){   //filtra as chaves de salmento do localStorage
            const produto = JSON.parse(localStorage.getItem(chave));

            if(produto.descricao && produto.descricao.toLowerCase().includes(nome.toLowerCase())){
                resultados.push(produto);
            }
        }
    }

    return resultados;
}
    
    async function mostrarDetalhes(id){

               
        const produtosSalvos = document.getElementById('produtosSalvos'); 
        const containerLocalizar = document.getElementById('containerLocalizar');
        const containerForm = document.getElementById('containerForm'); // captura o formulário de exibição de detalhes do produto

        produtosSalvos.style.display = 'none';  
        containerLocalizar.style.display = 'none';
        containerForm.style.display = 'grid';



        try {
            const res = await fetch(`http://localhost:3000/clientes/${id}`); // pega cliente com id=1
            if (!res.ok) throw new Error('Erro ao buscar cliente');
            
            const cliente = await res.json(); // aqui sim é um objeto

            //carrega os dados do cliente no formulário
            document.getElementById('codigo').value = cliente.id || "";
            document.getElementById('descricao').value = cliente.nome || "";
            document.getElementById('preco-compra').value = cliente.cpf || "";
            document.getElementById('margem').value = cliente.rua || "";
            document.getElementById('preco-venda').value = cliente.numero || "";
            document.getElementById('preco-prazo').value = cliente.bairro || "";
            document.getElementById('codigo-fornecedor').value = cliente.cidade || "";
            document.getElementById('fornecedor').value = cliente.pontoRef || "";
            document.getElementById('estoque-minimo').value = cliente.email || "";
            document.getElementById('estoque-atual').value = cliente.cpf || "";

        } catch (err) {
            console.error('Erro ao buscar dados da API:', err);
        }


        

        if (containerForm) {
            containerForm.addEventListener('submit', async (event) => {
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

       
    }
   
