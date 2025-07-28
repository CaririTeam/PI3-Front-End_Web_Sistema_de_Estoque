document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginMessage = document.getElementById('login-message');
    const loginButton = document.getElementById('login-button');
    const loadingSpinner = document.getElementById('loading-spinner');

    const API_URL = 'https://reqres.in/api/login';
    let errorTimeout;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 1. Validação inicial
        if (!validateForm()) {
            return; // Para a execução se a validação falhar
        }

        // 2. Inicia o estado de carregamento
        loginButton.disabled = true;
        loadingSpinner.style.display = 'block';

        try {
            const data = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            // 3. Verifica o resultado da API
            if (response.ok && responseData.token) {
                // SUCESSO!
                localStorage.setItem('isAuthenticated', 'true');
                // Redireciona IMEDIATAMENTE. Sem setTimeout.
                window.location.href = '../homepage/src/homepage.html';

            } else {
                // FALHA (seja da API ou token ausente)
                const errorMessage = responseData.error || 'E-mail ou senha incorretos.';
                showErrorMessage(loginMessage, errorMessage);
                
                // Reseta a UI APENAS em caso de falha
                loginButton.disabled = false;
                loadingSpinner.style.display = 'none';
            }

        } catch (error) {
            // FALHA DE REDE
            showErrorMessage(loginMessage, 'Erro ao conectar com o servidor.');
            console.error('Erro na requisição:', error);

            // Reseta a UI APENAS em caso de falha
            loginButton.disabled = false;
            loadingSpinner.style.display = 'none';
        }
    });

    // Funções de validação
    function validateForm() {
        let isValid = true;

        // Validação do e-mail
        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'O e-mail é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'E-mail inválido.');
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }

        // Validação da senha
        if (!passwordInput.value.trim()) {
            showError(passwordInput, passwordError, 'A senha é obrigatória.');
            isValid = false;
        } else if (passwordInput.value.trim().length < 8) {
            showError(passwordInput, passwordError, 'A senha deve ter pelo menos 8 caracteres.');
            isValid = false;
        } else {
            hideError(passwordInput, passwordError);
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Funções auxiliares para mostrar/ocultar erros e mensagens
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        clearTimeout(errorTimeout);
    }

    function hideError(input, errorElement) {
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
        clearTimeout(errorTimeout);
    }

    function showErrorMessage(element, message) {
        element.textContent = message;
        element.classList.remove('success');
        element.classList.add('error');
        element.style.display = 'block';
        clearTimeout(errorTimeout);

        errorTimeout = setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    emailInput.addEventListener('focus', () => {
        hideError(emailInput, emailError);
        loginMessage.style.display = 'none';
    });

    passwordInput.addEventListener('focus', () => {
        hideError(passwordInput, passwordError);
        loginMessage.style.display = 'none';
    });
});