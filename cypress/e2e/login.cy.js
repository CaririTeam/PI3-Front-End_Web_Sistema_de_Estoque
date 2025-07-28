describe('Fluxo de Login e Validação', () => {

  // Antes de cada teste, garante que estamos na página de login
  beforeEach(() => {
    cy.visit('/login/index.html');
  });

  // Teste 1: Validação de campos obrigatórios
  it('deve exibir mensagens de erro para campos obrigatórios', () => {
    // Aciona o evento de submit diretamente no formulário - a forma mais robusta
    cy.get('#login-form').submit();
    cy.get('#email-error').should('be.visible');
    cy.get('#password-error').should('be.visible');
  });

  // Teste 2: Validação de formato de e-mail e senha curta
  it('deve exibir mensagens de erro para formato inválido e senha curta', () => {
    cy.get('#email').type('email-invalido');
    cy.get('#password').type('123');
    // Aciona o submit diretamente
    cy.get('#login-form').submit();

    cy.get('#email-error').should('be.visible').and('contain.text', 'E-mail inválido.');
    cy.get('#password-error').should('be.visible').and('contain.text', 'A senha deve ter pelo menos 8 caracteres.');
  });

  // Teste 3: Simula um login com falha na API
  it('deve exibir uma mensagem de erro e resetar a interface em caso de falha na API', () => {
    // Prepara um "espião" para a chamada de rede
    cy.intercept('POST', 'https://reqres.in/api/login').as('loginRequest');

    cy.get('#email').type('peter.pan@reqres.in');
    cy.get('#password').type('somevalidpassword');
    cy.get('#login-form').submit();

    // Valida a sequência de eventos correta para FALHA:
    cy.get('#loading-spinner').should('be.visible'); // 1. Spinner aparece
    cy.wait('@loginRequest'); // 2. Espera a API responder
    cy.get('#login-message').should('be.visible'); // 3. Mensagem de erro aparece
    cy.get('#loading-spinner').should('not.be.visible'); // 4. Spinner desaparece
    cy.get('#login-button').should('not.be.disabled'); // 5. Botão é reativado
  });

  // Teste 4: O "caminho feliz" - login com sucesso
  it('deve redirecionar imediatamente após um login bem-sucedido', () => {
    // Prepara um "espião" para a chamada de rede
    cy.intercept('POST', 'https://reqres.in/api/login').as('loginRequest');

    cy.get('#email').type('eve.holt@reqres.in');
    cy.get('#password').type('cityslicka');
    cy.get('#login-form').submit();

    // Valida a sequência de eventos correta para SUCESSO:
    cy.get('#loading-spinner').should('be.visible'); // 1. Spinner aparece
    cy.wait('@loginRequest'); // 2. Espera a API responder

    // 3. Após a sincronização, verifica o resultado final com o método mais robusto
    cy.location('pathname').should('eq', '/homepage/src/homepage.html');
    cy.window().its('localStorage.isAuthenticated').should('eq', 'true');
  });
});