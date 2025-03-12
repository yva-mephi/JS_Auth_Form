import { serviceUpdateUser } from '../API/serviceUpdateUser';
import { getUserData } from './getUserData';

export function handleUserData(data) {
    const { user, missingFields } = data;

    if (missingFields.length === 0) {
        // Все данные заполнены
        console.log('Успешная авторизация');
        alert('Успешная авторизация!');
    } else {
        // Есть отсутствующие данные
        console.log('Требуется регистрация');
        alert('Требуется регистрация');
        showRegistrationForm(user, missingFields);
    }
}

const monthMapping = {
    '01': 'Январь',
    '02': 'Февраль',
    '03': 'Март',
    '04': 'Апрель',
    '05': 'Май',
    '06': 'Июнь',
    '07': 'Июль',
    '08': 'Август',
    '09': 'Сентябрь',
    '10': 'Октябрь',
    '11': 'Ноябрь',
    '12': 'Декабрь',
};

function showRegistrationForm(user, missingFields) {
    const isUpdate = document.querySelector('input[name="isUpdate"]');
    isUpdate.value = 'true';

    const registerForm = document.getElementById('register-form');
    const authForm = document.getElementById('login-form');
    const switchInput = document.getElementById('switch');
    const emailInput = registerForm.querySelector('input[type="email"]');
    const firstNameInput = registerForm.querySelector('input[name="first_name"]');
    const lastNameInput = registerForm.querySelector('input[name="last_name"]');
    const submitButton = registerForm.querySelector('button[type="submit"]');

    const daySelect = registerForm.querySelector('.custom-select:nth-child(1)');
    const monthSelect = registerForm.querySelector('.custom-select:nth-child(2)');
    const yearSelect = registerForm.querySelector('.custom-select:nth-child(3)');

    const maleInput = registerForm.querySelector('#male-input');
    const femaleInput = registerForm.querySelector('#female-input');

    emailInput.value = user.email;
    emailInput.disabled = true;
    firstNameInput.value = user.first_name || '';
    lastNameInput.value = user.last_name || '';

    if (user.date_of_birth) {
        const [year, month, day] = user.date_of_birth.split('-').map(part => part.trim());
        const formattedMonth = String(parseInt(month, 10));
        const parsedDay = String(parseInt(day, 10));
        console.log(year, formattedMonth, parsedDay);
        setCustomSelectValue(daySelect, parsedDay);
        setCustomSelectValue(monthSelect, formattedMonth);
        setCustomSelectValue(yearSelect, year);
    }

    if (user.gender) {
        if (user.gender === 'male') {
            maleInput.checked = true;
        } else if (user.gender === 'female') {
            femaleInput.checked = true;
        }
    }

    switchInput.disabled = true;

    registerForm.style.display = 'block';
    authForm.style.display = 'none';

    registerForm.onsubmit = async (e) => {
        e.preventDefault();

        submitButton.disabled = true;

        try {
            const formData = getUserData(registerForm);
            console.log('Данные формы:', formData);

            const isFormValid = Object.values(formData).every(value => value.trim() !== '');
            if (isFormValid) {
                await serviceUpdateUser(user, formData);
                alert('Регистрация завершена!');
                switchInput.disabled = false;
                isUpdate.value = 'false';
                location.reload();
                return;
            } else {
                alert('Заполните все обязательные поля!');
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            alert('Ошибка при обновлении данных: ' + error.message);
        } finally {
            submitButton.disabled = false;
        }
    };
}

function setCustomSelectValue(select, value) {
    const selectedElement = select.querySelector('.selected');
    const options = select.querySelectorAll('.option');

    options.forEach(option => {
        if (option.dataset.value === value) {
            selectedElement.innerText = option.innerText;
            selectedElement.dataset.value = option.dataset.value;
        }
    });
}
