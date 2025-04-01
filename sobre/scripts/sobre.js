document.addEventListener('DOMContentLoaded', function() {
    const userItem = document.getElementById('user-item');
    const loginItem = document.getElementById('login-item');
    const dashboardItem = document.getElementById('dashboard-item');
    const logoutLink = document.getElementById('logout-link');

    if (localStorage.getItem('isAuthenticated') === 'true') {
        userItem.style.display = 'block';
        loginItem.style.display = 'none';
        dashboardItem.style.display = 'block';
    } else {
        userItem.style.display = 'none';
        loginItem.style.display = 'block';
        dashboardItem.style.display = 'none';
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('isAuthenticated');
            window.location.href = '../login/index.html';
        });
    }
});