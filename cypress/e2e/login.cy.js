// cypress/e2e/login.cy.js

describe('Fluxo de Login e Validação', () => {

  // Antes de cada teste, visita a página de login
  beforeEach(() => {
    cy.visit('/login/index.html');
  });

  // Teste 1: Validação de campos obrigatórios
  it('deve exibir mensagens de erro para campos obrigatórios', () => {
    // Usa o ID do botão, que é um seletor mais robusto
    cy.get('#login-button').click();
    cy.get('#email-error').should('be.visible');
    cy.get('#password-error').should('be.visible');
  });

  // Teste 2: Validação de formato de e-mail e senha curta
  it('deve exibir mensagens de erro para formato inválido e senha curta', () => {
    cy.get('#email').type('email-invalido');
    cy.get('#password').type('123');
    cy.get('#login-button').click();

    cy.get('#email-error').should('be.visible').and('contain.text', 'E-mail inválido.');
    cy.get('#password-error').should('be.visible').and('contain.text', 'A senha deve ter pelo menos 8 caracteres.');
  });

  // Teste 3: Simula um login com falha na API
  it('deve exibir uma mensagem de erro geral para credenciais inválidas', () => {
    // INTERCEPTA a chamada de rede para a API de login
    cy.intercept('POST', 'https://reqres.in/api/login').as('loginRequest');

    cy.get('#email').type('peter.pan@reqres.in');
    cy.get('#password').type('somevalidpassword');
    cy.get('#login-button').click();

    // ESPERA a chamada de rede ser completada
    cy.wait('@loginRequest');

    // Verifica se a mensagem de erro está visível (teste mais robusto do que checar o texto exato)
    cy.get('#login-message').should('be.visible');
  });

  // Teste 4: O "caminho feliz" - login com sucesso
  it('deve realizar o login com sucesso com credenciais válidas', () => {
    // INTERCEPTA a chamada de rede para a API de login
    cy.intercept('POST', 'https://reqres.in/api/login').as('loginRequest');

    cy.get('#email').type('eve.holt@reqres.in');
    cy.get('#password').type('cityslicka');
    cy.get('#login-button').click();

    // ESPERA o spinner de loading aparecer, confirmando que o JS foi acionado
    cy.get('#loading-spinner').should('be.visible');

    // ESPERA a chamada de rede ser completada
    cy.wait('@loginRequest');

    // ESPERA o spinner desaparecer
    cy.get('#loading-spinner').should('not.be.visible');

    // AGORA SIM, verifica o redirecionamento e o localStorage
    cy.url().should('include', '/homepage/src/homepage.html');
    cy.window().its('localStorage.isAuthenticated').should('eq', 'true');
  });
});