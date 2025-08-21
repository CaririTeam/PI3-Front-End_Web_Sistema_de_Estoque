# Sistema de Gestão de Supermercado Web

Este projeto é um sistema web de gestão de estoque para supermercados, composto por um **Front-end** em HTML/CSS/JS e uma **API RESTful** em Node.js com Express.

## 🚀 Como Executar o Projeto Completo Localmente

Para testar a aplicação completa (Front-end e Back-end), siga os passos abaixo.

### 1. Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 14 ou superior)
-   Um editor de código como [VS Code](https://code.visualstudio.com/)

### 2. Configurando o Back-end (API)

Primeiro, vamos iniciar o servidor que gerencia os dados dos produtos.

1.  **Clone o repositório da API:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_DA_API]
    cd api-supermercado
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor da API:**
    ```bash
    node server.js
    ```
    > O terminal deve exibir a mensagem: `🚀 Servidor da API rodando em http://localhost:3000`. Deixe este terminal aberto.

### 3. Configurando o Front-end

Agora, em um **novo terminal**, vamos executar a interface do usuário.

1.  **Clone o repositório do Front-end:**
    ```bash
    git clone https://github.com/CaririTeam/PI3-Front-End_Web_Sistema_de_Estoque
    cd PI3-Front-End_Web_Sistema_de_Estoque
    ```

2.  **Abra com Live Server (VS Code):**
    *   Instale a extensão "Live Server".
    *   Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

## 📚 Documentação da API

A documentação detalhada das rotas, com exemplos de requisição e resposta para cada endpoint, está disponível aqui:

➡️ **[Acesse a Documentação Completa da API](./DOCUMENTACAO_API.md)** ⬅️
*(Este link funcionará se o arquivo `DOCUMENTACAO_API.md` estiver no mesmo repositório)*

## 🧪 Como Testar a API

Você pode usar ferramentas como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou o comando `curl` para testar os endpoints da API diretamente.

**Exemplo: Requisição para listar todos os produtos usando cURL**```bash
curl -X GET http://localhost:3000/produtos
```
**Resposta esperada:**
```json
[{"id":1,"nome":"Arroz Parboilizado","preco":6.50,"quantidade":100,"categoria":"Grãos"}, ...]
```

**Exemplo: Requisição para adicionar um novo produto usando cURL**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"nome":"Biscoito Recheado","preco":3.50,"quantidade":300,"categoria":"Mercearia"}' http://localhost:3000/produtos
```
**Resposta esperada:**
```json
{"id":4,"nome":"Biscoito Recheado","preco":3.50,"quantidade":300,"categoria":"Mercearia"}
```

## ✨ [Componente Extensionista] Possíveis usos da nossa API

A nossa API de gestão de estoque foi projetada para ser simples e robusta, abrindo um leque de possibilidades para otimizar operações em negócios do mundo real.

**Para um pequeno supermercado ou mercearia de bairro:**

*   **Controle de Estoque em Tempo Real:** O dono do mercado poderia usar um simples aplicativo (conectado à nossa API) em um tablet ou celular para dar entrada em novas mercadorias assim que chegam do fornecedor (usando a rota `POST /produtos`) e dar baixa em itens vendidos ou perdidos (usando a rota `PUT /produtos` para atualizar a quantidade). Isso reduziria drasticamente os erros de contagem manual.
*   **Integração com o Ponto de Venda (PDV):** O sistema do caixa poderia ser integrado à API. A cada venda registrada, ele faria uma chamada `PUT` para diminuir a quantidade do produto no estoque. Isso garante que o estoque digital esteja sempre sincronizado com o estoque físico.
*   **Alertas de Reposição:** Um sistema automatizado poderia consultar a rota `GET /produtos` periodicamente. Se a `quantidade` de um item cair abaixo de um nível crítico, o sistema poderia enviar um e-mail automático para o gerente, avisando que é hora de fazer um novo pedido daquele produto, evitando prateleiras vazias e perda de vendas.

Ao fornecer uma interface de programação clara e funcional, nossa API serve como a "espinha dorsal" para diversas ferramentas que modernizam a gestão, melhoram a eficiência e ajudam o negócio a crescer de forma organizada.