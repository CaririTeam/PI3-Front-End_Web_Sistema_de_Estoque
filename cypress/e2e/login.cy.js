// O `describe` agrupa um conjunto de testes relacionados a uma funcionalidade
describe('Fluxo de Login e Validação', () => {

  // O `beforeEach` é um "gancho" que roda antes de cada teste (`it`) dentro deste `describe`.
  // É perfeito para tarefas repetitivas, como visitar a mesma página.
  beforeEach(() => {
    // 1. Visita a página de login antes de cada teste
    cy.visit('/login/index.html');
  });

  // Teste 1: Validação de campos obrigatórios
  it('deve exibir mensagens de erro para campos obrigatórios', () => {
    // 2. Encontra o botão de submit pelo seu tipo e texto, e clica nele
    cy.get('button[type="submit"]').contains('Entrar').click();

    // 3. Verifica se os elementos de erro definidos em login.js estão visíveis
    //    e contêm a mensagem de erro correta.
    cy.get('#email-error').should('be.visible').and('contain.text', 'O e-mail é obrigatório.');
    cy.get('#password-error').should('be.visible').and('contain.text', 'A senha é obrigatória.');
  });

  // Teste 2: Validação de formato de e-mail e comprimento da senha
  it('deve exibir mensagens de erro para formato inválido e senha curta', () => {
    // 2. Digita um texto que não é um e-mail válido no campo de e-mail
    cy.get('#email').type('email-invalido');

    // 3. Digita uma senha com menos de 8 caracteres
    cy.get('#password').type('123');

    // 4. Clica para submeter o formulário
    cy.get('button[type="submit"]').click();

    // 5. Verifica se as mensagens de erro correspondentes aparecem
    cy.get('#email-error').should('be.visible').and('contain.text', 'E-mail inválido.');
    cy.get('#password-error').should('be.visible').and('contain.text', 'A senha deve ter pelo menos 8 caracteres.');
  });

  // Teste 3: Simula um login com falha na API
  it('deve exibir uma mensagem de erro geral para credenciais inválidas', () => {
    // 2. Usa um usuário que, segundo a API de testes Reqres, não existe
    cy.get('#email').type('peter.pan@reqres.in');
    cy.get('#password').type('somevalidpassword');
    cy.get('button[type="submit"]').click();

    // 3. Verifica se a mensagem de erro no login (#login-message) é exibida
    //    (seu código mostra 'E-mail ou senha incorretos.')
    cy.get('#login-message').should('be.visible').and('contain.text', 'E-mail ou senha incorretos.');
  });

  // Teste 4: O "caminho feliz" - login com sucesso
  it('deve realizar o login com sucesso com credenciais válidas', () => {
    // 2. Usa o e-mail de teste da API Reqres
    cy.get('#email').type('eve.holt@reqres.in');
    // A API não valida a senha, então qualquer uma com mais de 8 caracteres funciona
    cy.get('#password').type('cityslicka');

    // 3. Clica para entrar
    cy.get('button[type="submit"]').click();

    // 4. VERIFICAÇÕES CRÍTICAS:
    //    - A URL deve mudar para a homepage
    cy.url().should('include', '/homepage/src/homepage.html');
    //    - O item 'isAuthenticated' deve ter sido salvo no localStorage (conforme seu login.js)
    cy.window().its('localStorage.isAuthenticated').should('eq', 'true');
  });
});