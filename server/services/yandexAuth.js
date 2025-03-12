import { providerCallbackCheck } from '../utils/providerCallbackCheck';

const YANDEX_CLIENT_ID = process.env.YANDEX_CLIENT_ID;
const YANDEX_CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;
const YANDEX_REDIRECT_URI = `http://localhost:${process.env.HOST_PORT}${process.env.YANDEX_REDIRECT_URI}`;

const getYandexAuthURL = () => {
    const scopes = [
        'login:email', // доступ к электронной почте
        'login:info', // доступ к имени и фамилии
        'login:birthday', // доступ к дате рождения
    ];

    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${YANDEX_CLIENT_ID}&redirect_uri=${YANDEX_REDIRECT_URI}&scope=${scopes.join(' ')}`;
};

const processYandexCallback = async (code) => {
    try {
        const tokenResponse = await fetch('https://oauth.yandex.ru/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: YANDEX_CLIENT_ID,
                client_secret: YANDEX_CLIENT_SECRET,
                redirect_uri: YANDEX_REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const userInfoResponse = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${accessToken}`);
        const userData = await userInfoResponse.json();

        let user = {
            email: userData.default_email ?? null,
            first_name: userData.first_name ?? null,
            last_name: userData.last_name ?? null,
            date_of_birth: userData.birthday ?? null,
            gender: userData.sex === 'male' ? 'male' : userData.sex === 'female' ? 'female' : null,
            provider_name: 'yandex',
            id: userData.id,
        };

        user = await providerCallbackCheck(user, 'yandex', user.id);

        console.log(user);

        return user;
    } catch (error) {
        console.error('Ошибка при обработке коллбэка Яндекс:', error);
        throw error;
    }
};

const yandexAuth = {
    getYandexAuthURL,
    processYandexCallback,
};

export default yandexAuth;