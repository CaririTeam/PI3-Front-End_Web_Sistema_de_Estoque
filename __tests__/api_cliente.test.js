const app= require("../api-cliente/server");
const request = require("supertest");

describe("Testes da API - Clientes", () => {
  
    test('GET /clientes deve retornar lista de clientes', async () => {
        const res = await request(app).get('/clientes');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });  

    test('GET /clientes/1 deve retornar o cliente de ID = 1', async () => {
        const res = await request(app).get('/clientes/1');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", 1);
        expect(res.body).toHaveProperty("nome");
        expect(res.body).toHaveProperty("cpf");
        expect(res.body).toHaveProperty("email");
        expect(res.body).toHaveProperty("telefone");
        expect(res.body).toHaveProperty("rua");
        expect(res.body).toHaveProperty("numero");
        expect(res.body).toHaveProperty("bairro");
        expect(res.body).toHaveProperty("cidade");
        expect(res.body).toHaveProperty("pontoRef");
    }); 

    test('GET /clientes/10 deve retornar uma resposta HTTP 404', async () => {
        const res = await request(app).get('/clientes/10');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg" , "Não encontrado");
    });
    
    test('POST /clientes deve adicionar um novo cliente', async () => {

        const novoCliente = {

            "id": "3", 
            "nome": "pedro", 
            "cpf": "020.196.945-77", 
            "email": "pedro@email.com", 
            "telefone": "88988500123", 
            "rua": "Rua felix",
            "numero": "85",
            "bairro": "Centro",
            "cidade": "Juazeiro do Norte",
            "pontoRef": "Ao lado do zezim motopeças"

        };

        const res = await request(app).post('/clientes').send(novoCliente);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id", "3");
        expect(res.body).toHaveProperty("nome", "pedro");
        expect(res.body).toHaveProperty("cpf", "020.196.945-77");
        expect(res.body).toHaveProperty("email", "pedro@email.com");
        expect(res.body).toHaveProperty("telefone" , "88988500123");
        expect(res.body).toHaveProperty("rua", "Rua felix");
        expect(res.body).toHaveProperty("numero", "85");
        expect(res.body).toHaveProperty("bairro", "Centro");
        expect(res.body).toHaveProperty("cidade", "Juazeiro do Norte");
        expect(res.body).toHaveProperty("pontoRef", "Ao lado do zezim motopeças");
    }); 


    test('PUT /clientes deve atualizar os dados do cliente', async () => {

        const atualizaCliente = {

            id: 1, 
            nome: "João", 
            cpf: "086.596.745-66", 
            email: "joao@email.com", 
            telefone: "88988500123", 
            rua: "Rua Tenente Luiz",
            numero: "385",
            bairro: "Vila velha",
            cidade: "Juazeiro do Norte",
            pontoRef: "em frente ao mundo mania"

        };

        const res = await request(app).put('/clientes/1').send(atualizaCliente);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", 1);
        expect(res.body).toHaveProperty("nome", "João");
        expect(res.body).toHaveProperty("cpf", "086.596.745-66");
        expect(res.body).toHaveProperty("email", "joao@email.com");
        expect(res.body).toHaveProperty("telefone" , "88988500123");
        expect(res.body).toHaveProperty("rua", "Rua Tenente Luiz");
        expect(res.body).toHaveProperty("numero", "385");
        expect(res.body).toHaveProperty("bairro", "Vila velha");
        expect(res.body).toHaveProperty("cidade", "Juazeiro do Norte");
        expect(res.body).toHaveProperty("pontoRef", "em frente ao mundo mania");
    }); 


    test('PUT / clientes deve retornar uma resposta HTTP 404', async () => {

        const res = await request(app).put('/clientes/10');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg" , "Não encontrado");

    });


    test('DELETE /clientes deve deletar os dados do cliente', async () => {        

        const res = await request(app).delete('/clientes/2');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Removido com sucesso");
    }); 


    test('DELETE / clientes deve retornar uma resposta HTTP 404', async () => {

        const res = await request(app).delete('/clientes/10');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg" , "Não encontrado");

    });


});