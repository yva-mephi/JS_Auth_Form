export const handleAuth = (provider) => {
    // Отправляем пользователя на бэкенд для авторизации
    window.location.href = `http://localhost:5000/auth/${provider}`;
};

export const handleAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
        try {
            // Декодируем и парсим данные
            const userData = JSON.parse(decodeURIComponent(data));
            console.log('Данные пользователя:', userData);

            // Очищаем URL от query-параметров
            window.history.replaceState({}, document.title, window.location.pathname);

            return userData; // Возвращаем данные
        } catch (error) {
            console.error('Ошибка при обработке данных:', error);
        }
    }
    return null;
};