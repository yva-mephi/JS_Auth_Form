import { pool } from './database.js';

// Функция для поиска пользователя по ID стороннего сервиса
export async function findUserByProviderId(provider, providerId) {
    const query = 'SELECT * FROM users WHERE provider = $1 AND provider_id = $2;';
    const result = await pool.query(query, [provider, providerId]);
    return result.rows[0];
}