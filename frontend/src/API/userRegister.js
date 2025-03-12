export const userRegister = async (userData) => {
    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            // Парсим ответ сервера, чтобы получить сообщение об ошибке
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при регистрации');
        }

        const data = await response.json();
        return data; // Возвращаем данные от сервера (например, информацию о пользователе)
    } catch (error) {
        console.error('Ошибка:', error);
        throw error; // Пробрасываем ошибку дальше
    }
};