# Sistema de Gestão de Supermercado Web

Este projeto é um sistema web full-stack de gestão de estoque para supermercados. Ele é composto por um **Front-end** desenvolvido com HTML, CSS e JavaScript puro, e um **Back-end** que consiste em uma API RESTful criada com Node.js e Express.

O projeto foi desenvolvido como parte de um projeto integrado para as disciplinas de Desenvolvimento Web e Projeto Integrado III.

## 💻 Estrutura do Projeto

O repositório está organizado da seguinte forma:

-   **`api-supermercado/`**: Contém todo o código-fonte do back-end (servidor e rotas da API).
-   **`cadastro/`**: Tela de Cadastro de usuários.
-   **`cadastro_novo_produto/`**: Tela para cadastrar novos produtos.
-   **`cypress/`**: Testes automatizados de ponta a ponta.
-   **`homepage/`**: Tela inicial após o login (Dashboard principal).
-   **`login/`**: Tela de Login de usuários.
-   **`sobre/`**: Página "Sobre" o sistema.
-   **`tela_produtos/`**: Tela de gerenciamento de produtos (que consome nossa API).
-   **`index.html`**: Arquivo raiz que redireciona para a tela de login.

## 🚀 Como Executar o Projeto Completo Localmente

Para testar a aplicação completa, você precisa rodar o back-end (servidor) e o front-end (interface do usuário) simultaneamente.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 16 ou superior)
-   Um editor de código como [VS Code](https://code.visualstudio.com/) com a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### 1. Configurando o Back-end (API)

Primeiro, vamos iniciar o servidor que gerencia os dados dos produtos.

1.  **Abra um terminal** na raiz do projeto.
2.  Navegue até o diretório da API:
    ```bash
    cd api-supermercado
    ```
3.  Instale as dependências do back-end:
    ```bash
    npm install
    ```
4.  Inicie o servidor da API:
    ```bash
    node server.js
    ```
    ✅ O terminal deve exibir as mensagens de confirmação, incluindo a URL da documentação. **Deixe este terminal aberto.**
    ```
    🚀 Servidor da API rodando em http://localhost:3000
    📄 Documentação da API disponível em http://localhost:3000/api-docs
    ```

### 2. Configurando o Front-end

Agora, em um **novo terminal**, vamos executar a interface do usuário.

1.  Navegue até a raiz do projeto.
2.  Instale as dependências do front-end (usadas para testes e automação):
    ```bash
    npm install
    ```
3.  Inicie o front-end com o Live Server:
    *   No VS Code, clique com o botão direito no arquivo `index.html` na raiz do projeto.
    *   Selecione "Open with Live Server".
    *   Seu navegador abrirá automaticamente a aplicação.

## 📚 Documentação da API Interativa (Swagger)

Este projeto utiliza **Swagger UI** para gerar uma documentação da API que é dinâmica, interativa e sempre atualizada com o código-fonte.

Para acessar a documentação, primeiro inicie o servidor do back-end (conforme o passo "Configurando o Back-end") e então acesse o seguinte link no seu navegador:

➡️ **[Acesse a Documentação Interativa da API](http://localhost:3000/api-docs)** ⬅️

A API implementa cinco rotas funcionais do recurso produtos, que cobrem todas as operações do ciclo de vida de um item de estoque (CRUD - Create, Read, Update, Delete), utilizando métodos HTTP semânticos.
Rotas Principais
| Método | Rota           | Funcionalidade                                    |
|--------|----------------|--------------------------------------------------|
| GET    | /produtos      | Retorna lista completa de produtos cadastrados. |
| GET    | /produtos/:id  | Retorna detalhes de um produto pelo seu ID.     |
| POST   | /produtos      | Cadastra um novo produto com dados como nome, preço e categoria. |
| PUT    | /produtos/:id  | Atualiza dados específicos de um produto existente. |
| DELETE | /produtos/:id  | Remove um produto do sistema.   

Na interface do Swagger, você poderá não apenas ler sobre cada endpoint, mas também **executar requisições de teste** diretamente do seu navegador.

## 🧪 Como Testar a API Diretamente (Alternativa)

Para testes rápidos via linha de comando ou com outras ferramentas, você pode usar os seguintes exemplos com `cURL`.

**Exemplo: Requisição para listar todos os produtos**

```bash
curl -X GET http://localhost:3000/produtos
```

**Exemplo: Requisição para adicionar um novo produto**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"nome":"Biscoito Recheado","preco":3.50,"quantidade":300,"categoria":"Mercearia"}' http://localhost:3000/produtos
```

## 🔑 Login e Cadastro

**Nota:** A funcionalidade de **login e cadastro de usuários** ainda utiliza a API de teste [Reqres](https://reqres.in/) para simulação, enquanto a **gestão de produtos** já está integrada com a nossa API local (`localhost:3000`).

-   **Login (Teste):** Para um login bem-sucedido, use o e-mail `eve.holt@reqres.in`. A senha pode ser qualquer uma.

## ✨ Possíveis usos da nossa API

A nossa API de gestão de estoque foi projetada para ser simples e robusta, abrindo um leque de possibilidades para otimizar operações em negócios do mundo real.

**Para um pequeno supermercado ou mercearia de bairro:**

-   **Controle de Estoque em Tempo Real:** O dono do mercado poderia usar um simples aplicativo (conectado à nossa API) em um tablet ou celular para dar entrada em novas mercadorias assim que chegam do fornecedor (usando a rota `POST /produtos`) e dar baixa em itens vendidos ou perdidos (usando a rota `PUT /produtos` para atualizar a quantidade). Isso reduziria drasticamente os erros de contagem manual.
-   **Integração com o Ponto de Venda (PDV):** O sistema do caixa poderia ser integrado à API. A cada venda registrada, ele faria uma chamada `PUT` para diminuir a quantidade do produto no estoque. Isso garante que o estoque digital esteja sempre sincronizado com o estoque físico.
-   **Alertas de Reposição:** Um sistema automatizado poderia consultar a rota `GET /produtos` periodicamente. Se a `quantidade` de um item cair abaixo de um nível crítico, o sistema poderia enviar um e-mail automático para o gerente, avisando que é hora de fazer um novo pedido daquele produto, evitando prateleiras vazias e perda de vendas.

Ao fornecer uma interface de programação clara e funcional, nossa API serve como a "espinha dorsal" para diversas ferramentas que modernizam a gestão, melhoram a eficiência e ajudam o negócio a crescer de forma organizada.

## 🤖 Integração Contínua e Testes Automatizados

[![CI Pipeline](https://github.com/CaririTeam/PI3-Front-End_Web_Sistema_de_Estoque/actions/workflows/main.yml/badge.svg)](https://github.com/CaririTeam/PI3-Front-End_Web_Sistema_de_Estoque/actions/workflows/main.yml)

Este projeto utiliza um pipeline de **Integração Contínua (CI)** configurado com GitHub Actions para automatizar a verificação do nosso código, garantindo que novas alterações não introduzam erros e mantenham um alto padrão de qualidade.

Nosso processo automatizado executa duas tarefas essenciais:
1.  **Verificação de Qualidade (Lint):** O ESLint analisa estaticamente o código JavaScript em busca de erros, inconsistências e potenciais bugs.
2.  **Testes de Ponta a Ponta (E2E):** O Cypress simula um usuário real interagindo com a aplicação, testando os fluxos críticos como o de login.

### O que é Integração Contínua?

Imagine que nosso projeto é um carro sendo montado. Cada desenvolvedor adiciona uma peça (código). **Integração Contínua (CI)** é a linha de montagem automatizada que inspeciona cada peça e testa o carro inteiro assim que a peça é instalada. Se algo der errado, o processo para e avisa o responsável imediatamente. Isso é essencial para encontrar erros mais rápido, colaborar em equipe de forma segura e construir um portfólio profissional.

## 🧪 Testes Automatizados

Este projeto utiliza **Jest** e **Supertest** para validar os endpoints da API de clientes.

## 🛠 Tecnologias de Teste

* **Jest** → framework de testes em JavaScript que executa os testes e gera relatórios no terminal. Ele oferece ferramentas para criar asserções (`expect`) e verificar a cobertura de código.
* **Supertest** → biblioteca que facilita o teste de APIs HTTP. Com ela é possível simular requisições (`GET`, `POST`, `PUT`, `DELETE`) diretamente na aplicação Express sem precisar subir o servidor em uma porta.

📌 Em conjunto, o **Jest** roda os testes e o **Supertest** envia as requisições para validar os endpoints da API.

### Instalação das dependências de teste

```bash
npm install --save-dev jest supertest
```
📌 A flag “--save-dev” instala o pacote apenas para o ambiente de desenvolvimento. No ambiente de produção esse pacote não será necessário.

### Repositório e script de teste

Foi criao um repositório de nome "`__test__"

Dentro desse repositório foi criado um script de testes com o nome "api_cliente.test.js"

### Executando os testes

Antes de rodar os testes é importante configurar o package.json em sua seção scripts:

```bash
"scripts": {
    "jtest": "jest --coverage --watch"  // linha adicionada
 },
```
📌 Isso serve para executar o script de teste com a palavra chave “jtest”. Muito útil quando a linha de comando é extensa.

📌 A flag “--coverage” do Jest mostra a cobertura dos testes sobre o módulo testado. Além disso, é gerado um “index.html” com o código testado, destacando as linhas não cobertas pelo teste. 

📌 A flag “--wach” do Jest permite a execução dos testes sempre que salvar alterações no projeto. É necessário que o projeto esteja em um repositório git.


Para rodar o script de test, execute a seguinte linha de comando no terminal:

```bash
npm run jtest
```

## ⌨️ Atalhos do Jest no modo `--watch`

Quando o Jest é executado com a flag `--watch`, você pode usar atalhos no terminal para controlar a execução dos testes:

* **`f` → run only failed tests**
  Roda apenas os testes que falharam na última execução.
  👉 Útil para corrigir erros sem rodar tudo de novo.

* **`o` → only run tests related to changed files**
  Executa somente os testes relacionados aos arquivos que você acabou de modificar.
  👉 Economiza tempo em projetos grandes.

* **`p` → filter by a filename regex pattern**
  Permite digitar parte do nome do arquivo de teste (regex) para rodar só os testes que estão nele.
  👉 Exemplo: digitar `cliente` → roda só arquivos que tenham `cliente.test.js`.

* **`t` → filter by a test name regex pattern**
  Filtra por nome do teste definido no `test()` ou `it()`.
  👉 Exemplo: se você digitar `DELETE`, roda só os testes que têm "DELETE" no título.

* **`q` → quit watch mode**
  Sai do modo `--watch` e volta para o terminal normal.

* **`Enter` → trigger a test run**
  Reexecuta todos os testes sem filtro, mesmo sem mudar nenhum arquivo.

📌 A opção recomendada é a última, portanto pressione enter para selecionar a execução de todos os testes após salvar alguma alteração no projeto.

### O que está sendo testado

* **GET /clientes** → deve retornar a lista de clientes.
* **GET /clientes/:id** → deve retornar o cliente quando existe, ou erro 404 quando não encontrado.
* **POST /clientes** → deve criar um novo cliente e retornar status 201.
* **PUT /clientes/:id** → deve atualizar os dados de um cliente existente.
* **DELETE /clientes/:id** → deve remover um cliente e confirmar a exclusão.

### Observação

Certifique-se de que o servidor **não está rodando em outra instância** quando executar os testes, pois o Jest usa o `app` exportado sem precisar chamar `app.listen()`.
### Conclusão

Para garantir uma maior qualidade do produto de software é necessário que os testes iniciem em paralelo com o processo de desenvolvimento desse. Testar não é entregar um software livre de erros, mas é entregar um produto o mais fiel ao que foi solicitado.
Destaca-se nesse trabalho a importância dos testes manuais e automatizados em seu respectivo estágio. O insomnia permite testar as rotas de forma manual sem a necessidade de um front-end. Isso facilita muito o processo de teste durante o desenvolvimento, pois não é necessário esperar pela construção de um front-end para iniciar os testes, assim como quebra um pouco da complexidade do teste aos olhos do executor que vai tratar apenas do back-end.
O Jest junto com Supertest formam uma ferramenta valiosa para os testes automatizados. Com essas ferramentas podemos testar o código em vários cenários, comparando as saídas desejadas com as alcançadas. Também é importante destacar a funcionalidade de cobertura de teste que é mostrado graficamente para o executor do teste em instruções, ramos, funções e linhas. Uma página web com mais detalhes da cobertura dos testes também é disponibilizada, nela é possível ver os trechos do código que não foram cobertos pelos testes em destaque.
A flag “--watch” é muito útil para o processo automatizado dos testes, com ela é possível executar os testes sempre que salvar alterações no projeto. Algumas opções de reexecução de testes são ofertadas, mas é interessante que se possível reexecute todos os testes sem filtros. 


## 📄 Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
