import github from '../services/githubAuth.js';

export default async (req, res, pathname, params) => {
    if (req.method === 'GET') {
        if (pathname === '/auth/github') {
            const AuthURL = github.getGitHubAuthURL();
            res.statusCode = 302;
            res.setHeader('Location', AuthURL);
            res.end();
        } else if (pathname === process.env.GITHUB_REDIRECT_URI) {
            const { code } = params;
            if (!code) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Code is missing' }));
                return;
            }
            try {
                const user = await github.processGitHubCallback(code);
                const data = encodeURIComponent(JSON.stringify(user));

                // Редирект на фронтенд с данными в query-параметрах
                res.statusCode = 302;
                res.setHeader('Location', `http://localhost:3000/?data=${data}`);
                res.end();
            } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Ошибка обработки коллбэка GitHub' }));
            }
        }
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Not found' }));
    }
};