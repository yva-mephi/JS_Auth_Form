import { createServer } from 'http';
import url from 'url';
import querystring from 'querystring';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import googleAuthRoutes from './routes/googleRoutes.js';

const server = createServer(async (req, res) => {
    const { pathname, query } = url.parse(req.url);
    const params = querystring.parse(query);

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    switch (pathname) {
        case '/login':
        case '/register':
            await authRoutes(req, res, pathname);
            break;
        case '/update-user':
            await userRoutes(req, res);
            break;
        case '/auth/google':
        case process.env.GOOGLE_CALLBACK:
            await googleAuthRoutes(req, res, pathname, params);
            break;
        default:
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
            break;
    }
})

server.listen(process.env.HOST_PORT, () => {
    console.log(`сервер развернут на порту ${process.env.HOST_PORT}`);
})