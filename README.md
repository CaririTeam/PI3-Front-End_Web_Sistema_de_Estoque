# Sistema de Gestão de Supermercado Web - Front-end

Este projeto é a parte Front-end de um sistema web de gestão de estoque para supermercados, desenvolvido como parte de um projeto integrado para disciplinas de Desenvolvimento Web e Projeto Integrado III.

## 💻 Estrutura do Projeto

O projeto está organizado nas seguintes pastas, cada uma representando uma funcionalidade ou tela do sistema:

-   **`cadastro/`**: Tela de Cadastro de usuários.
-   **`cadastro_novo_produto/`**: Tela para cadastrar novos produtos.
-   **`homepage/`**: Tela inicial após o login (Dashboard principal).
-   **`login/`**: Tela de Login de usuários.
-   **`sobre/`**: Página "Sobre" o sistema.
-   **`tela_inicial/`**: Outra versão da tela inicial (dashboard).
-   **`tela_produtos/`**: Tela de gerenciamento de produtos.
-   **`index.html`**: Arquivo raiz que redireciona para a tela de login.

## 🚀 Como Executar o Projeto Localmente

Siga estes passos para executar o projeto no seu ambiente local:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/CaririTeam/PI3-Front-End_Web_Sistema_de_Estoque
    ```

2.  **Navegue até o Diretório do Projeto:**
    ```bash
    cd PI3-Front-End_Web_Sistema_de_Estoque
    ```

3.  **Instale as Dependências (Necessário para testes e automação):**
    ```bash
    npm install
    ```

4.  **Abra com Live Server (VS Code) - Recomendado:**
    *   Instale a extensão "Live Server" no VS Code.
    *   Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

5.  **Usando `http-server` (Alternativa):**
    *   No terminal, na raiz do projeto, execute:
        ```bash
        npm run start
        ```
    *   Acesse o projeto em `http://localhost:8080`.

## 🔑 Login e Cadastro (API de Teste)

Este projeto utiliza a API de teste [Reqres](https://reqres.in/) para simular as funcionalidades de login e cadastro.

*   **Login:** Para um login bem-sucedido nos testes, use o e-mail `eve.holt@reqres.in`. A senha pode ser qualquer uma, pois a API de teste não a valida.
*   **Autenticação:** O estado de autenticação é simulado via `localStorage`.

## ✅ Validação de Formulários

O projeto implementa validações de formulário no lado do cliente para garantir a integridade dos dados e melhorar a experiência do usuário, incluindo verificação de campos obrigatórios, formato de e-mail e comprimento de senha.

## 🤖 Integração Contínua e Testes Automatizados

[![CI Pipeline](https://github.com/CaririTeam/PI3-Front-End_Web_Sistema_de_Estoque/actions/workflows/main.yml/badge.svg)](https://github.com/CaririTeam/PI3-Front-End_Web_Sistema_de_Estoque/actions/workflows/main.yml)

Este projeto utiliza um pipeline de **Integração Contínua (CI)** configurado com GitHub Actions. O objetivo é automatizar a verificação do nosso código, garantindo que novas alterações não introduzam erros e mantenham um alto padrão de qualidade. O pipeline é acionado a cada `push` ou `pull request` para a branch `main`.

Nosso processo automatizado executa duas tarefas essenciais em sequência:

1.  **Verificação de Qualidade (Lint):** Primeiro, o pipeline usa o **ESLint** para analisar estaticamente todo o código JavaScript. Ele verifica erros de sintaxe, inconsistências de estilo e potenciais bugs, garantindo que o código seja limpo e padronizado.
2.  **Testes de Ponta a Ponta (E2E):** Se o código passar na verificação de qualidade, o **Cypress** entra em ação. Ele abre um navegador e simula um usuário real interagindo com nossa aplicação, testando os fluxos da tela de login para garantir que tudo funcione como esperado.

### O que é Integração Contínua? Por que isso é importante para você?

Imagine que nosso projeto é um carro sendo montado em uma fábrica. Cada desenvolvedor é um mecânico que adiciona uma peça nova (um pedaço de código).

**Integração Contínua (CI)** é como ter uma linha de montagem automatizada e inteligente. Assim que um mecânico instala uma peça nova (ou seja, envia o código para o repositório), robôs entram em ação para:

1.  **Inspecionar a peça:** Eles verificam se a peça tem o formato e a qualidade corretos. Essa é a nossa **Verificação de Qualidade (Lint)**.
2.  **Testar o carro inteiro:** Eles ligam o carro e testam se ele ainda acelera, freia e vira corretamente com a nova peça. Esses são os nossos **Testes Automatizados (E2E)**.

Se qualquer um desses testes falhar, a linha de montagem para imediatamente e avisa o mecânico. Isso evita que um carro com defeito chegue ao consumidor final.

**Por que isso é essencial para você, estudante de programação?**

*   **Encontrar erros mais rápido:** Ajuda a identificar problemas no exato momento em que são criados, acabando com o famoso "mas no meu computador funciona!".
*   **Colaborar em equipe de forma segura:** Garante que o código de um colega não "quebre" o seu, tornando o trabalho em grupo muito mais tranquilo e produtivo.
*   **Construir um portfólio profissional:** Dominar ferramentas de CI/CD (Integração e Entrega Contínua) é uma habilidade extremamente valorizada no mercado. Mostrar que você já as utiliza em seus projetos acadêmicos é um grande diferencial.
*   **Criar o hábito da qualidade:** Acostuma você a sempre escrever código testável e de alta qualidade desde o início da sua carreira, uma prática que o acompanhará para sempre.

## 📄 Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
