import { google } from 'googleapis';
import { providerCallbackCheck } from '../utils/providerCallbackCheck';

// Настройки Google OAuth
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,  // client_id
    process.env.GOOGLE_CLIENT_SECRET,  // client_secret
    `http://localhost:${process.env.HOST_PORT}${process.env.GOOGLE_CALLBACK}`  // Redirect URI
);

const getGoogleAuthURL = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email', // доступ к электронной почте
        'https://www.googleapis.com/auth/userinfo.profile', // доступ к имени и фамилии
        'https://www.googleapis.com/auth/user.birthday.read', // доступ к дате рождения
        'https://www.googleapis.com/auth/user.gender.read', // доступ к полу
    ];

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
}

const processGoogleCallback = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();
    let user = {
        email: data.email ?? null,
        first_name: data.given_name ?? null,
        last_name: data.family_name ?? null,
        date_of_birth: data.birthday ?? null,
        gender: data.gender ?? null,
        provider_name: 'google',
        id: data.id
    };

    user = await providerCallbackCheck(user, 'google', user.id);

    console.log(user);

    return user;
}


const googleAuth = {
    getGoogleAuthURL,
    processGoogleCallback,
};

export default googleAuth;