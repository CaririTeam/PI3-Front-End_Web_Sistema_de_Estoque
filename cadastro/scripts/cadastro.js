document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const cadastroMessage = document.getElementById('cadastro-message');
    const cadastroButton = document.getElementById('cadastro-button');
    const loadingSpinner = document.getElementById('loading-spinner');

    const API_URL = 'https://reqres.in/api/register';
    let cadastroTimeout;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            cadastroButton.disabled = true;
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
                showSuccessMessage(cadastroMessage, 'Cadastro realizado com sucesso!');
                nomeInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                localStorage.setItem('isAuthenticated', 'true');
                setTimeout(() => {
                    window.location.href = '../login/index.html';
                }, 2000);
            } else {
                const errorMessage = responseData.error || 'Erro ao cadastrar.';
                showErrorMessage(cadastroMessage, errorMessage);
            }

        } catch (error) {
            showErrorMessage(cadastroMessage, 'Erro ao conectar com o servidor.');
            console.error('Erro na requisição:', error);
        } finally {
            cadastroButton.disabled = false;
            loadingSpinner.style.display = 'none';
        }
    });

    function validateForm() {
        let isValid = true;

        // Validação do Nome
        if (!nomeInput.value.trim()) {
            showError(nomeInput, nomeError, 'O nome é obrigatório.');
            isValid = false;
        } else {
            hideError(nomeInput, nomeError);
        }

        // Validação do E-mail
        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'O e-mail é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'E-mail inválido.');
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }

        // Validação da Senha
        if (!passwordInput.value.trim()) {
            showError(passwordInput, passwordError, 'A senha é obrigatória.');
            isValid = false;
        } else if (passwordInput.value.trim().length < 8) {
            showError(passwordInput, passwordError, 'A senha deve ter pelo menos 8 caracteres.');
            isValid = false;
        } else {
            hideError(passwordInput, passwordError);
        }

        // Validação da Confirmação de Senha
        if (!confirmPasswordInput.value.trim()) {
            showError(confirmPasswordInput, confirmPasswordError, 'Confirme a senha.');
            isValid = false;
        } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
            showError(confirmPasswordInput, confirmPasswordError, 'As senhas não coincidem.');
            isValid = false;
        } else {
            hideError(confirmPasswordInput, confirmPasswordError);
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        clearTimeout(cadastroTimeout);
    }

    function hideError(input,errorElement) {
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
        clearTimeout(cadastroTimeout);
    }

    function showSuccessMessage(element, message) {
        element.textContent = message;
        element.classList.remove('error');
        element.classList.add('success');
        element.style.display = 'block';
        clearTimeout(cadastroTimeout);
    }

    function showErrorMessage(element, message) {
        element.textContent = message;
        element.classList.remove('success');
        element.classList.add('error');
        element.style.display = 'block';

        clearTimeout(cadastroTimeout);
        cadastroTimeout = setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    nomeInput.addEventListener('focus', () => {
        hideError(nomeInput, nomeError);
        cadastroMessage.style.display = 'none';
    });
    emailInput.addEventListener('focus', () => {
        hideError(emailInput, emailError);
        cadastroMessage.style.display = 'none';
    });
    passwordInput.addEventListener('focus', () => {
        hideError(passwordInput, passwordError);
        cadastroMessage.style.display = 'none';
    });
    confirmPasswordInput.addEventListener('focus', () => {
        hideError(confirmPasswordInput, confirmPasswordError);
        cadastroMessage.style.display = 'none';
    });
});