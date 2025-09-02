const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware para permitir que a API entenda JSON no corpo das requisições
app.use(express.json());

// --- BANCO DE DADOS EM MEMÓRIA (SIMULAÇÃO) ---
let produtos = [
    { id: 1, nome: 'Arroz Parboilizado', preco: 6.50, quantidade: 100, categoria: 'Grãos' },
    { id: 2, nome: 'Feijão Carioca', preco: 8.00, quantidade: 150, categoria: 'Grãos' },
    { id: 3, nome: 'Óleo de Soja 900ml', preco: 7.25, quantidade: 80, categoria: 'Óleos' }
];
let proximoId = 4;

// --- CONFIGURAÇÃO DO SWAGGER ---
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Supermercado',
      version: '1.0.0',
      description: 'Documentação da API RESTful para o sistema de gestão de estoque de supermercado. Utilize esta interface para testar os endpoints.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento Local'
      },
    ],
  },
  apis: ['./server.js'], // Arquivo que contém a documentação das rotas
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// --- DEFINIÇÃO DO SCHEMA DE PRODUTO PARA REUTILIZAÇÃO ---
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - quantidade
 *         - categoria
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente para o produto.
 *         nome:
 *           type: string
 *           description: O nome do produto.
 *         preco:
 *           type: number
 *           format: float
 *           description: O preço do produto.
 *         quantidade:
 *           type: integer
 *           description: A quantidade do produto em estoque.
 *         categoria:
 *           type: string
 *           description: A categoria do produto.
 *       example:
 *         id: 1
 *         nome: "Arroz Parboilizado"
 *         preco: 6.50
 *         quantidade: 100
 *         categoria: "Grãos"
 */

// --- ROTAS ---

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Obtém um produto específico pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Dados do produto retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado.
 */
app.get('/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
});

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               quantidade:
 *                 type: integer
 *               categoria:
 *                 type: string
 *             example:
 *               nome: "Leite Integral 1L"
 *               preco: 5.80
 *               quantidade: 200
 *               categoria: "Laticínios"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Dados inválidos fornecidos.
 */
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

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               quantidade:
 *                 type: integer
 *               categoria:
 *                 type: string
 *             example:
 *               preco: 7.00
 *               quantidade: 95
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
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

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto a ser deletado
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso. (Sem conteúdo)
 *       404:
 *         description: Produto não encontrado.
 */
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const indexDoProduto = produtos.findIndex(p => p.id === parseInt(id));

    if (indexDoProduto === -1) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    produtos.splice(indexDoProduto, 1);
    res.status(204).send();
});


// --- INICIA O SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
    console.log(`📄 Documentação da API disponível em http://localhost:${PORT}/api-docs`);
});