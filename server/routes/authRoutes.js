import { authUser } from '../database/authUser.js';
import { registerUser } from '../database/registerUser.js';

export default async (req, res, pathname) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);

                if (pathname === '/login') {
                    const { email, password } = data;
                    const userData = await authUser(email, password);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, user: userData }));
                } else if (pathname === '/register') {
                    const { email, password, first_name, last_name, date_of_birth, gender } = data;
                    const newUser = await registerUser(email, password, first_name, last_name, date_of_birth, gender, null, null);

                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, user: newUser }));
                }
            } catch (error) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');

                if (error.message === 'Пользователь с таким email не найден') {
                    res.end(JSON.stringify({ success: false, error: 'Пользователь с таким email не найден' }));
                } else if (error.message === 'Неверный пароль') {
                    res.end(JSON.stringify({ success: false, error: 'Неверный пароль' }));
                } else if (error.message === 'Пользователь с таким email уже существует') {
                    res.end(JSON.stringify({ success: false, error: 'Пользователь с таким email уже существует' }));
                } else {
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            }
        });
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request method' }));
    }
};