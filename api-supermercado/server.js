const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;

// Middleware para permitir que a API entenda JSON no corpo das requisições
app.use(express.json());

// --- BANCO DE DADOS EM MEMÓRIA ---
let produtos = [
    { id: 1, nome: 'Arroz Parboilizado', preco: 6.50, quantidade: 100, categoria: 'Grãos' },
    { id: 2, nome: 'Feijão Carioca', preco: 8.00, quantidade: 150, categoria: 'Grãos' },
    { id: 3, nome: 'Óleo de Soja 900ml', preco: 7.25, quantidade: 80, categoria: 'Óleos' }
];
let proximoId = 4;

// --- ROTAS ---

// ROTA 1: Listar todos os produtos (GET /produtos)
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

// ROTA 2: Obter um produto específico pelo ID (GET /produtos/:id)
app.get('/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
});

//ROTA 3: Adicionar um novo produto (POST /produtos)
app.post('/produtos', (req, res) => {
    const { nome, preco, quantidade, categoria } = req.body;

    if (!nome || !preco || !quantidade || !categoria) {
        return res.status(400).json({ message: 'Todos os campos (nome, preco, quantidade, categoria) são obrigatórios.' });
    }

    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        quantidade,
        categoria
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// ROTA 4: Atualizar um produto existente (PUT /produtos/:id)
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const indexDoProduto = produtos.findIndex(p => p.id === parseInt(id));

    if (indexDoProduto === -1) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    const produtoOriginal = produtos[indexDoProduto];

    const produtoAtualizado = { ...produtoOriginal, ...req.body };

    produtos[indexDoProduto] = produtoAtualizado;
    
    res.status(200).json(produtoAtualizado);
});

// ROTA 5: Deletar um produto (DELETE /produtos/:id)
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const indexDoProduto = produtos.findIndex(p => p.id === parseInt(id));

    if (indexDoProduto === -1) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    produtos.splice(indexDoProduto, 1);
    res.status(204).send();
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});