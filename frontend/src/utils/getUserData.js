export const getUserData = (form) => {
    return {
        email: getEmail(form),
        first_name: getFirstName(form),
        last_name: getLastName(form),
        date_of_birth: getDateOfBirth(
            form.querySelector('.custom-select:nth-child(1)'),
            form.querySelector('.custom-select:nth-child(2)'),
            form.querySelector('.custom-select:nth-child(3)')
        ),
        gender: getGender(form),
        password: getPassword(form),
    }
}


export const getFirstName = (form) => {
    return form.querySelector('input[name="first_name"]').value.trim();
};

export const getLastName = (form) => {
    return form.querySelector('input[name="last_name"]').value.trim();
};

export const getEmail = (form) => {
    return form.querySelector('input[type="email"]').value.trim();
};

export const getPassword = (form) => {
    return form.querySelector('input[type="password"]').value.trim();
};

export function getDateOfBirth(daySelect, monthSelect, yearSelect) {
    const day = daySelect.querySelector('.selected').innerText || '';
    const month = monthSelect.querySelector('.selected').innerText || '';
    const year = yearSelect.querySelector('.selected').innerText || '';

    if (!day || !month || !year) {
        throw new Error('Не все поля даты рождения заполнены');
    }

    const monthMapping = {
        'Январь': '01',
        'Февраль': '02',
        'Март': '03',
        'Апрель': '04',
        'Май': '05',
        'Июнь': '06',
        'Июль': '07',
        'Август': '08',
        'Сентябрь': '09',
        'Октябрь': '10',
        'Ноябрь': '11',
        'Декабрь': '12'
    };

    // Получаем числовое значение месяца
    const formattedMonth = monthMapping[month];
    if (!formattedMonth) {
        throw new Error('Некорректное название месяца');
    }

    // Форматируем день, чтобы всегда было два символа
    const formattedDay = day.padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export const getGender = (form) => {
    const maleInput = form.querySelector('#male-input');
    const femaleInput = form.querySelector('#female-input');
    return maleInput.checked ? 'male' : femaleInput.checked ? 'female' : '';
};