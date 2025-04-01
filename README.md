# Sistema de Gestão de Supermercado Web - Front-end

Este projeto é a parte Front-end de um sistema web de gestão de estoque para supermercados, desenvolvido como parte de um projeto integrado para disciplinas de Desenvolvimento Web e Projeto Integrado III.

## 💻 Estrutura do Projeto

O projeto está organizado nas seguintes pastas, cada uma representando uma funcionalidade ou tela do sistema:

-   **`cadastro/`**: Tela de Cadastro de usuários.
    -   `index.html`: Estrutura HTML da tela de cadastro.
    -   `scripts/cadastro.js`: Lógica JavaScript para validação e interação da tela de cadastro.
    -   `styles/cadastro.css`: Estilos CSS para a tela de cadastro.
-   **`cadastro_novo_produto/`**: Tela para cadastrar novos produtos no sistema.
    -   `src/novo-produto.html`: Estrutura HTML do formulário de cadastro de produto.
    -   `scripts/novo-produto-scripts.js`: Lógica JavaScript para validação do formulário de novo produto.
    -   `styles/novo-produto-styles.css`: Estilos CSS para a tela de novo produto.
-   **`homepage/`**: Tela inicial após o login (Dashboard principal).
    -   `src/homepage.html`: Estrutura HTML da homepage.
    -   `scripts/scripts.js`: Lógica JavaScript para interatividade da homepage.
    -   `styles/styles.css`: Estilos CSS para a homepage.
-   **`login/`**: Tela de Login de usuários.
    -   `index.html`: Estrutura HTML da tela de login.
    -   `scripts/login.js`: Lógica JavaScript para validação e interação da tela de login.
    -   `styles/login.css`: Estilos CSS para a tela de login.
-   **`sobre/`**: Página "Sobre" o sistema.
    -   `index.html`: Estrutura HTML da página "Sobre".
    -   `scripts/sobre.js`: Lógica JavaScript para a página "Sobre" (navbar).
    -   `styles/sobre.css`: Estilos CSS para a página "Sobre".
-   **`tela_inicial/`**: Tela inicial após o login (similar à homepage, pode ser considerada o dashboard principal).
    -   `tela-inicial.html`: Estrutura HTML da tela inicial.
    -   `scripts/tela-inicial.js`: Lógica JavaScript para a tela inicial.
    -   `styles/styles.css`: Estilos CSS para a tela inicial.
    -   `imagens/`: Imagens específicas da tela inicial.
-   **`tela_produtos/`**: Tela de Produtos, com opções para gerenciar produtos.
    -   `src/produtos.html`: Estrutura HTML da tela de produtos.
    -   `scripts/scripts-produtos.js`: Lógica JavaScript para a tela de produtos.
    -   `styles/styles-produtos.css`: Estilos CSS para a tela de produtos.
-   **`index.html`**: Arquivo raiz que redireciona para a tela de login.

## 🚀 Como Executar o Projeto Localmente

Siga estes passos para executar o projeto no seu ambiente local:

1.  **Clone o Repositório:**
    ```bash
    git clone PI3-Front-End_Web_Sistema_de_Estoque
    ```

2.  **Navegue até o Diretório do Projeto:**
    ```bash
    cd PI3-Front-End_Web_Sistema_de_Estoque
    ```

3.  **Abra com Live Server (VS Code) - Recomendado:**
    *   Se você usa o VS Code, instale a extensão "Live Server".
    *   Clique com o botão direito no arquivo `index.html` na raiz do projeto e selecione "Open with Live Server".
    *   O projeto será aberto no seu navegador padrão, geralmente em `http://localhost:5500/`.

4.  **Usando `http-server` (Alternativa - Node.js necessário):**
    *   Certifique-se de ter o Node.js e npm instalados.
    *   Abra o terminal na raiz do projeto e execute:
        ```bash
        npx http-server
        ```
    *   Acesse o projeto no navegador, geralmente em `http://localhost:8080`.

## 🔑 Login e Cadastro (API de Teste)

Este projeto utiliza a API de teste [Reqres](https://reqres.in/) para simular as funcionalidades de login e cadastro.

*   **Cadastro:**
    *   Para um cadastro bem-sucedido, utilize o e-mail `eve.holt@reqres.in` (ou outros e-mails de teste fornecidos pela Reqres). Outros e-mails podem resultar em erros da API de teste.
    *   Após o cadastro, você será automaticamente redirecionado para a tela de login.
*   **Login:**
    *   Utilize o e-mail e senha que você cadastrou para realizar o login.
    *   Após o login bem-sucedido, você será redirecionado para a tela inicial (`tela_inicial/tela-inicial.html` ou `homepage/src/homepage.html`).

**Observação sobre Autenticação:** A autenticação é simulada utilizando `localStorage`. O projeto define um item `isAuthenticated` como `true` após um login ou cadastro bem-sucedido.

## ✅ Validação de Formulários

O projeto implementa validações de formulário no lado do cliente para garantir a integridade dos dados e melhorar a experiência do usuário. As validações incluem:

*   **Campos obrigatórios:** Verificação se campos essenciais foram preenchidos.
*   **Formato de e-mail:** Validação do formato correto de e-mails.
*   **Comprimento de senha:** Verificação de requisitos mínimos para senhas (ex: mínimo de 8 caracteres).
*   **Confirmação de senha:** Garantia de que a senha e a confirmação coincidem.
*   **Validação de números e inteiros:**  Em campos numéricos, como preços e estoques, assegurando que são números válidos e, em alguns casos, não negativos ou inteiros.
*   **Validação de data:** No formulário de "Novo Produto", a data de validade é validada para garantir que seja uma data futura.

As validações são implementadas em JavaScript nos arquivos de script de cada tela (ex: `cadastro/scripts/cadastro.js`, `login/scripts/login.js`, `cadastro_novo_produto/scripts/novo-produto-scripts.js`).  Estilos CSS (`.invalid` e `.error-message` em arquivos CSS correspondentes) são utilizados para destacar campos inválidos e exibir mensagens de erro de forma visualmente clara.

## 📄 Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE) - veja o arquivo `LICENSE` para detalhes. (Arquivo `LICENSE` geralmente está na raiz do repositório, se aplicável).
