import { updateUser } from '../database/updateUser.js';

export default async (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {

                if (!body) {
                    throw new Error('Тело запроса пустое');
                }

                const dataToSend = JSON.parse(body);
                const updatedUser = await updateUser(dataToSend.id, dataToSend);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, user: updatedUser }));
            } catch (error) {
                console.error('Ошибка при обработке запроса:', error);
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });

        req.on('error', (error) => {
            console.error('Ошибка при чтении тела запроса:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Ошибка при чтении тела запроса' }));
        });
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request method' }));
    }
};