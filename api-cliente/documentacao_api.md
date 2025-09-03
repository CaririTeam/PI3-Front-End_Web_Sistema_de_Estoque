# Documentação da API - Gestão de Supermercado

Esta documentação detalha os endpoints, recursos e exemplos de uso da API de Gestão de Estoque de Supermercado no módulo 'Clientes'.

URL Base: `http://localhost:3000`

---

## 1. Recurso: Clientes

O recurso `Clientes` representa os clientes cadastrados no sistema do supermercado.

### 1.1. Listar todos os Clientes

-   Método: `GET`
-   Endpoint: `/clientes`
-   Descrição: Retorna uma lista com todos os clientes cadastrados no sistema.
-   Resposta de Sucesso (200 OK):
    ```json
    [
     {
        "id": "1",
        "nome": "João", 
        "cpf": "086.596.745-66", 
        "email": "joao@email.com", 
        "telefone": "88988500123", 
        "rua": "Rua 15 de maio",
        "numero": "35",
        "bairro": "Centro",
        "cidade": "Juazeiro do Norte",
        "pontoRef": "Ao lado do abc comécio"
     }
    ]
    ```

### 1.2. Adicionar um novo Cliente

-   Método: `POST`
-   Endpoint: `/clientes`
-   Descrição: Cria um novo cliente no sistema.
-   Corpo da Requisição (Body):
    ```json
    {
        "id": "2", 
        "nome": "Pedro", 
        "cpf": "060.586.321-61", 
        "email": "pedro@email.com", 
        "telefone": "88988500123", 
        "rua": "Rua Paixão de todos",
        "numero": "50",
        "bairro": "Zona sul",
        "cidade": "Pelotas",
        "pontoRef": "Ao lado da borracharia do zezé"
    }
    ```
-   Resposta de Sucesso (201 Created):
    ```json
    {
        "id": "2", 
        "nome": "Pedro", 
        "cpf": "060.586.321-61", 
        "email": "pedro@email.com", 
        "telefone": "88988500123", 
        "rua": "Rua Paixão de todos",
        "numero": "50",
        "bairro": "Zona sul",
        "cidade": "Pelotas",
        "pontoRef": "Ao lado da borracharia do zezé"
    }
    ```

### 1.3. Atualizar um cliente

-   Método: `PUT`
-   Endpoint: `/cliente/:id`
-   Descrição: Atualiza os dados de um cliente existente, identificado pelo seu `id`.
-   Parâmetro de URL:
    -   `id` (obrigatório): O ID do cliente a ser atualizado.
-   Corpo da Requisição (Body):
    ```json
    {
        "numero": "55",
        "bairro": "Zona Norte",
    }
    ```
-   Resposta de Sucesso (200 OK):
    ```json
    {
        "id": "2", 
        "nome": "Pedro", 
        "cpf": "060.586.321-61", 
        "email": "pedro@email.com", 
        "telefone": "88988500123", 
        "rua": "Rua Paixão de todos",
        "numero": "55",
        "bairro": "Zona Norte",
        "cidade": "Pelotas",
        "pontoRef": "Ao lado da borracharia do zezé"
    }
    ```

### 1.4. Deletar um cliente

-   Método: `DELETE`
-   Endpoint: `/clientes/:id`
-   Descrição: Remove um cliente do sistema com base no seu `id`.
-   Parâmetro de URL:
    -   `id` (obrigatório): O ID do cliente a ser removido.
-   Resposta de Sucesso (204 No Content):
    -   A resposta não contém corpo.