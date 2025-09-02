

    const produtosSalvos = document.getElementById('produtosSalvos');    
    

    for (let i = 0; i < localStorage.length; i++){
        const chave = localStorage.key(i);
        if (chave.startsWith('cliente_')) {
            const valor = JSON.parse(localStorage.getItem(chave));
            

            const produto = JSON.parse(localStorage.getItem(chave)); // recuperação dos dados do localStorage
        
            const divContainer = document.createElement('div');
            divContainer.style.display = 'grid';
            divContainer.style.placeItems = 'center';
            divContainer.style.gridTemplateColumns = '1fr 3fr 1fr 1fr 1fr 1fr';        
            divContainer.style.margin = '1vh';

            
            
            // cria os elementos
            const codigoDiv = document.createElement('div');
            codigoDiv.textContent = produto.codigo;     

            const descricaoDiv = document.createElement('div');
            descricaoDiv.textContent = produto.descricao;

            const estoqueMinDiv = document.createElement('div');
            estoqueMinDiv.textContent = produto.estoque_minimo;

            const estoqueAtualDiv = document.createElement('div');
            estoqueAtualDiv.textContent = produto.estoque_atual;

            const estoqueMaxDiv = document.createElement('div');
            estoqueMaxDiv.textContent = produto.estoque_maximo;
            
            const botaoDiv = document.createElement('button');
            botaoDiv.textContent = "+ Detalhes";
            botaoDiv.style.background = '#10403b';
            botaoDiv.style.color = 'white';
            botaoDiv.dataset.codigo = produto.codigo;
            
            botaoDiv.addEventListener('click',() =>{   // botão de + detalhes
                console.log(produto.codigo);
                mostrarDetalhes(produto.codigo);
            });
            
            //adiciona os filhos ao container pai
            divContainer.appendChild(codigoDiv);
            divContainer.appendChild(descricaoDiv);
            divContainer.appendChild(estoqueMinDiv);
            divContainer.appendChild(estoqueAtualDiv);
            divContainer.appendChild(estoqueMaxDiv);
            divContainer.appendChild(botaoDiv);

            //adiciona o container pai a div do HTML
            produtosSalvos.appendChild(divContainer); 
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
    
    function mostrarDetalhes(codigo){

               
        const produtosSalvos = document.getElementById('produtosSalvos'); 
        const containerLocalizar = document.getElementById('containerLocalizar');
        const containerForm = document.getElementById('containerForm'); // captura o formulário de exibição de detalhes do produto

        produtosSalvos.style.display = 'none';  
        containerLocalizar.style.display = 'none';
        containerForm.style.display = 'grid';

        const produto = JSON.parse(localStorage.getItem('cliente_' + codigo));

        //carrega os dados do localStorage para dentro do formulário
        document.getElementById('codigo').value = produto.codigo;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('unidade').value = produto.unidade;
        document.getElementById('preco-compra').value = produto.preco_compra;
        document.getElementById('margem').value = produto.margem;
        document.getElementById('preco-venda').value = produto.preco_venda;
        document.getElementById('preco-prazo').value = produto.preco_prazo;
        document.getElementById('codigo-fornecedor').value = produto.codigo_fornecedor;
        document.getElementById('fornecedor').value = produto.forncedor;
        document.getElementById('estoque-minimo').value = produto.estoque_minimo;
        document.getElementById('estoque-atual').value = produto.estoque_atual;
        document.getElementById('estoque-maximo').value = produto.estoque_maximo;
        document.getElementById('lote').value = produto.lote;
        document.getElementById('data-validade').value = produto.data_validade;

        //torna os campos do formulario com somente leitura
        document.getElementById('codigo').readOnly = true;
        document.getElementById('descricao').readOnly = true;
        document.getElementById('unidade').readOnly = true;
        document.getElementById('preco-compra').readOnly = true;
        document.getElementById('margem').readOnly = true;
        document.getElementById('preco-venda').readOnly = true;
        document.getElementById('preco-prazo').readOnly = true;
        document.getElementById('codigo-fornecedor').readOnly = true;
        document.getElementById('fornecedor').readOnly = true;
        document.getElementById('estoque-minimo').readOnly = true;
        document.getElementById('estoque-atual').readOnly = true;
        document.getElementById('estoque-maximo').readOnly = true;
        document.getElementById('lote').readOnly = true;
        document.getElementById('data-validade').readOnly = true;
        
        

    
    }
   
