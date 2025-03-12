export const userAuth = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при авторизации');
        }

        const data = await response.json();
        return data; // Возвращаем данные от сервера (например, токен или информацию о пользователе)
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};