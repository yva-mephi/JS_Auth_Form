export const serviceUpdateUser = async (userData, formData) => {
    try {
        // Объединяем данные пользователя и данные с формы
        // Данные из формы имеют приоритет над данными из userData
        const dataToSend = {
            ...userData, // Исходные данные (provider, provider_id и т.д.)
            ...formData, // Данные с формы (first_name, last_name, date_of_birth, gender)
        };

        console.log('Данные для отправки:', dataToSend);
        console.log('JSON данные:', JSON.stringify(dataToSend));

        // Отправляем запрос на бэкенд
        const response = await fetch('http://localhost:5000/update-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении данных пользователя');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};