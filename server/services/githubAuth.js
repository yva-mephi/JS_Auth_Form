import { providerCallbackCheck } from '../utils/providerCallbackCheck';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = `http://localhost:${process.env.HOST_PORT}${process.env.GITHUB_REDIRECT_URI}`;

const getGitHubAuthURL = () => {
    const state = Math.random().toString(36).substring(7); // Генерация случайного значения для state
    return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&state=${state}&scope=user:email`;
};

const processGitHubCallback = async (code) => {
    try {
        // Получаем access_token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: GITHUB_REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const userInfoResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userData = await userInfoResponse.json();

        const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const emails = await emailResponse.json();
        const primaryEmail = emails.find((email) => email.primary)?.email || null;

        let user = {
            email: primaryEmail,
            first_name: userData.name ? userData.name.split(' ')[0] : null,
            last_name: userData.name ? userData.name.split(' ')[1] : null,
            provider_name: 'github',
            id: userData.id,
        };

        user = await providerCallbackCheck(user, 'github', user.id);

        console.log(user);

        return user;
    } catch (error) {
        console.error('Ошибка при обработке коллбэка GitHub:', error);
        throw error;
    }
};

const githubAuth = {
    getGitHubAuthURL,
    processGitHubCallback,
};

export default githubAuth;