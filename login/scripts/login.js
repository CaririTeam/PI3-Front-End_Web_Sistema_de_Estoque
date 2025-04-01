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

        if (!validateForm()) {
            return;
        }

        try {
            loginButton.disabled = true;
            loadingSpinner.style.display = 'block';
            const data = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                 if (responseData.token) {
                    localStorage.setItem('isAuthenticated', 'true');
                        setTimeout(() => {
                            window.location.href = '../homepage/src/homepage.html';
                        }, 200);
                } else {
                    showErrorMessage(loginMessage, 'Erro inesperado.  Token não recebido.');
                }

            } else {
                const errorMessage = responseData.error || 'E-mail ou senha incorretos.';
                 showErrorMessage(loginMessage, errorMessage);
            }

        } catch (error) {
            showErrorMessage(loginMessage, 'Erro ao conectar com o servidor.');
            console.error('Erro na requisição:', error);

        } finally {
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

    function showSuccessMessage(element, message) {
        element.textContent = message;
        element.classList.remove('error');
        element.classList.add('success');
        element.style.display = 'block';
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