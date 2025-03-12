import { initCustomSelect } from './components/CustomSelect.js';
import { handleAuth, handleAuthCallback } from './API/serviceAuth.js';
import { userAuth } from './API/userAuth.js';
import { userRegister } from './API/userRegister.js';
import { handleUserData } from './utils/servicesFormReg.js'
import { getUserData, getEmail, getPassword } from './utils/getUserData';
// Инициализация кастомного выпадающего списка
initCustomSelect();

const isUpdate = document.querySelector('input[name="isUpdate"]');

// Обработка callback при загрузке страницы
const userData = handleAuthCallback();

if (userData) {
    handleUserData(userData);
    isUpdate.value = 'true';
}


document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const authForm = document.getElementById('login-form');
    const email = getEmail(authForm);
    const password = getPassword(authForm);
    console.log(email, password)

    try {
        const response = await userAuth(email, password);
        console.log('Успешная авторизация:', response);
        alert('Вы успешно авторизованы!');
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        alert('Ошибка авторизации: ' + error.message);
    }
});

if (isUpdate.value === 'false') {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const registerForm = document.getElementById('register-form');
        const formData = getUserData(registerForm);
        console.log(formData);
        try {
            const response = await userRegister(formData);
            console.log('Успешная регистрация:', response);
            alert('Вы успешно зарегистрированы!');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            alert('Ошибка регистрации: ' + error.message);
        }
    });
}
document.getElementById('google-auth').addEventListener('click', () => {
    handleAuth('google');
});

document.getElementById('yandex-auth').addEventListener('click', () => {
    handleAuth('yandex');
});

document.getElementById('mailru-auth').addEventListener('click', () => {
    handleAuth('mailru');
});
document.getElementById('github-auth').addEventListener('click', () => {
    handleAuth('github');
});

document.getElementById('outlook-auth').addEventListener('click', () => {
    alert('Ожидает реализации');
});

document.getElementById('yahoo-auth').addEventListener('click', () => {
    alert('Ожидает реализации');
});

document.getElementById('icloud-auth').addEventListener('click', () => {
    alert('Ожидает реализации');
});
