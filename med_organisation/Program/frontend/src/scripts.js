const authForm = document.getElementById('auth-form');
const registrationForm = document.getElementById('registration-form');
const showRegistration = document.getElementById('show-registration');
const showAuth = document.getElementById('show-auth');

showRegistration.addEventListener('click', (e) => {
    e.preventDefault();
    authForm.style.display = 'none';
    registrationForm.style.display = 'block';
});

showAuth.addEventListener('click', (e) => {
    e.preventDefault();
    registrationForm.style.display = 'none';
    authForm.style.display = 'block';
});
