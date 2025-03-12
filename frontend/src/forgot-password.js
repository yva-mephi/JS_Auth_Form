const emailInput = document.getElementById('email');
const recoveryMethodRadios = document.querySelectorAll('input[name="recovery-method"]');
const secretQuestionSection = document.getElementById('secret-question-section');
const phoneSection = document.getElementById('phone-section');
const secretAnswerInput = document.getElementById('secret-answer');
const phoneInput = document.getElementById('phone');
const sendSmsButton = document.getElementById('send-sms');
const smsCodeSection = document.getElementById('sms-code-section');
const smsCodeInputs = document.querySelectorAll('.sms-code');
const confirmCodeButton = document.getElementById('confirm-code');
const recoveryButtons = document.querySelectorAll('.recovery-button');

// Включение выбора способа восстановления после ввода почты
emailInput.addEventListener('input', () => {
    const isEmailFilled = emailInput.value.trim() !== '';
    recoveryMethodRadios.forEach(radio => {
        radio.disabled = !isEmailFilled;
    });
});

// Переключение между секциями "Секретный вопрос" и "Номер телефона"
recoveryMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'secret-question') {
            secretQuestionSection.style.display = 'block';
            phoneSection.style.display = 'none';
            secretAnswerInput.disabled = false;
        } else {
            secretQuestionSection.style.display = 'none';
            phoneSection.style.display = 'block';
            phoneInput.disabled = false;
        }
    });
});

// Включение кнопки "Восстановить пароль" для секретного вопроса
secretAnswerInput.addEventListener('input', () => {
    recoveryButtons[0].disabled = secretAnswerInput.value.trim() === '';
});

// Включение кнопки "Отправить SMS" для номера телефона
phoneInput.addEventListener('input', () => {
    sendSmsButton.disabled = phoneInput.value.trim() === '';
});

// Логика для отправки SMS
sendSmsButton.addEventListener('click', () => {
    smsCodeSection.style.display = 'block';
    smsCodeInputs.forEach(input => input.disabled = false);
    alert('SMS отправлено на ваш номер!');
});

// Логика для ввода кода из SMS
smsCodeInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < smsCodeInputs.length - 1) {
            smsCodeInputs[index + 1].focus();
        }
        confirmCodeButton.disabled = Array.from(smsCodeInputs).some(input => input.value === '');
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            smsCodeInputs[index - 1].focus();
        }
    });
});

// Логика для подтверждения кода
confirmCodeButton.addEventListener('click', () => {
    const code = Array.from(smsCodeInputs).map(input => input.value).join('');
    alert(`Код ${code} подтвержден!`);
    recoveryButtons[1].disabled = false;
});