import mailru from '../services/mailruAuth.js';

export default async (req, res, pathname, params) => {
    if (req.method === 'GET') {
        if (pathname === '/auth/mailru') {
            const AuthURL = mailru.getMailruAuthURL();
            res.statusCode = 302;
            res.setHeader('Location', AuthURL);
            res.end();
        } else if (pathname === process.env.MAILRU_REDIRECT_URI) {
            const { code, state } = params;

            if (!code) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Code is missing' }));
                return;
            }

            if (!state) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'State is missing' }));
                return;
            }

            try {
                const user = await mailru.processMailruCallback(code);
                const data = encodeURIComponent(JSON.stringify(user));

                // Редирект на фронтенд с данными в query-параметрах
                res.statusCode = 302;
                res.setHeader('Location', `http://localhost:3000/?data=${data}`);
                res.end();
            } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Ошибка обработки коллбэка Mail.ru' }));
            }
        }
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Not found' }));
    }
};