import google from '../services/googleAuth.js';

export default async (req, res, pathname, params) => {
    if (req.method === 'GET') {
        if (pathname === '/auth/google') {
            const AuthURL = google.getGoogleAuthURL();
            res.statusCode = 302;
            res.setHeader('Location', AuthURL);
            res.end();
        } else if (pathname === process.env.GOOGLE_CALLBACK) {
            const { code } = params;
            if (!code) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Code is missing' }));
                return;
            }
            try {
                const user = await google.processGoogleCallback(code);
                const data = encodeURIComponent(JSON.stringify(user));

                // Редирект на фронтенд с данными в query-параметрах
                res.statusCode = 302;
                res.setHeader('Location', `http://localhost:3000/?data=${data}`);
                res.end();
            } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Ошибка обработки коллбэка' }));
            }
        }
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Not found' }));
    }
};