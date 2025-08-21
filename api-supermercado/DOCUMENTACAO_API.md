# Documentação da API - Gestão de Supermercado

Esta documentação detalha os endpoints, recursos e exemplos de uso da API de Gestão de Estoque de Supermercado.

URL Base: `http://localhost:3000`

---

## 1. Recurso: Produtos

O recurso `Produtos` representa os itens disponíveis no estoque do supermercado.

### 1.1. Listar todos os produtos

-   Método: `GET`
-   Endpoint: `/produtos`
-   Descrição: Retorna uma lista com todos os produtos cadastrados no sistema.
-   Resposta de Sucesso (200 OK):
    ```json
    [
        {
            "id": 1,
            "nome": "Arroz Parboilizado",
            "preco": 6.50,
            "quantidade": 100,
            "categoria": "Grãos"
        },
        {
            "id": 2,
            "nome": "Feijão Carioca",
            "preco": 8.00,
            "quantidade": 150,
            "categoria": "Grãos"
        }
    ]
    ```

### 1.2. Adicionar um novo produto

-   Método: `POST`
-   Endpoint: `/produtos`
-   Descrição: Cria um novo produto no estoque.
-   Corpo da Requisição (Body):
    ```json
    {
        "nome": "Leite Integral 1L",
        "preco": 4.80,
        "quantidade": 200,
        "categoria": "Laticínios"
    }
    ```
-   Resposta de Sucesso (201 Created):
    ```json
    {
        "id": 4,
        "nome": "Leite Integral 1L",
        "preco": 4.80,
        "quantidade": 200,
        "categoria": "Laticínios"
    }
    ```

### 1.3. Atualizar um produto

-   Método: `PUT`
-   Endpoint: `/produtos/:id`
-   Descrição: Atualiza os dados de um produto existente, identificado pelo seu `id`.
-   Parâmetro de URL:
    -   `id` (obrigatório): O ID do produto a ser atualizado.
-   Corpo da Requisição (Body):
    ```json
    {
        "preco": 4.95,
        "quantidade": 180
    }
    ```
-   Resposta de Sucesso (200 OK):
    ```json
    {
        "id": 4,
        "nome": "Leite Integral 1L",
        "preco": 4.95,
        "quantidade": 180,
        "categoria": "Laticínios"
    }
    ```

### 1.4. Deletar um produto

-   Método: `DELETE`
-   Endpoint: `/produtos/:id`
-   Descrição: Remove um produto do sistema com base no seu `id`.
-   Parâmetro de URL:
    -   `id` (obrigatório): O ID do produto a ser removido.
-   Resposta de Sucesso (204 No Content):
    -   A resposta não contém corpo.