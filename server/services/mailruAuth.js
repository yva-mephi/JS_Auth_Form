import { providerCallbackCheck } from '../utils/providerCallbackCheck';
import { formatDate } from '../utils/formatDate';

const MAILRU_CLIENT_ID = process.env.MAILRU_CLIENT_ID;
const MAILRU_CLIENT_SECRET = process.env.MAILRU_CLIENT_SECRET;
const MAILRU_REDIRECT_URI = `http://localhost:${process.env.HOST_PORT}${process.env.MAILRU_REDIRECT_URI}`;

const getMailruAuthURL = () => {
    const state = Math.random().toString(36).substring(7); // Генерация случайного значения для state
    return `https://oauth.mail.ru/login?client_id=${MAILRU_CLIENT_ID}&response_type=code&redirect_uri=${MAILRU_REDIRECT_URI}&state=${state}`;
    // const redirectUri = encodeURIComponent(MAILRU_REDIRECT_URI);
    // return `https://oauth.mail.ru/login?client_id=${MAILRU_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&state=${state}`;
    // return `https://oauth.mail.ru/login?client_id=${MAILRU_CLIENT_ID}&response_type=code&redirect_uri=${MAILRU_REDIRECT_URI}&state=${state}`;
};

const processMailruCallback = async (code) => {
    try {
        // Получаем access_token
        const tokenResponse = await fetch('https://oauth.mail.ru/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: MAILRU_CLIENT_ID,
                client_secret: MAILRU_CLIENT_SECRET,
                redirect_uri: MAILRU_REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Получаем данные пользователя
        const userInfoResponse = await fetch(`https://oauth.mail.ru/userinfo?access_token=${accessToken}`);
        const userData = await userInfoResponse.json();

        // Формируем объект пользователя
        let user = {
            email: userData.email ?? null,
            first_name: userData.first_name ?? null,
            last_name: userData.last_name ?? null,
            date_of_birth: userData.birthday ?? null,
            gender: userData.sex === '0' ? 'male' : userData.sex === '1' ? 'female' : null,
            provider_name: 'mailru',
            id: userData.id,
        };

        user.date_of_birth = formatDate(userData.birthday);

        // Проверяем и сохраняем пользователя в базе данных
        user = await providerCallbackCheck(user, 'mailru', user.id);

        console.log(user);

        return user;
    } catch (error) {
        console.error('Ошибка при обработке коллбэка Mail.ru:', error);
        throw error;
    }
};

const mailruAuth = {
    getMailruAuthURL,
    processMailruCallback,
};

export default mailruAuth;