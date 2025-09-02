const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Lista em memória (dados de exemplo)
let clientes = [
  { 
    id: 1, 
    nome: "João", 
    cpf: "086.596.745-66",
    email: "joao@email.com",      
    telefone: "88988500123",
    rua: "Rua 15 de maio",
    numero: "35",
    bairro: "Centro",
    cidade: "Juazeiro do Norte",
    pontoRef: "Ao lado do abc comécio"
}];

let idSeq = 3;

// Buscar todos
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

// Buscar por id
app.get("/clientes/:id", (req, res) => {
  const dado = clientes.find(d => d.id === parseInt(req.params.id));
  if (!dado) return res.status(404).json({ msg: "Não encontrado" });
  res.json(dado);
});

// Criar
app.post("/clientes", (req, res) => {
  const novo = { id: idSeq++, ...req.body };
  clientes.push(novo);
  res.status(201).json(novo);
});

// Atualizar
app.put("/clientes/:id", (req, res) => {
  const index = clientes.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ msg: "Não encontrado" });
  clientes[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(clientes[index]);
});

// Deletar
app.delete("/clientes/:id", (req, res) => {
  clientes = contatos.filter(d => d.id !== parseInt(req.params.id));
  res.json({ msg: "Removido com sucesso" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});