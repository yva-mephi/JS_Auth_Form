import { pool } from './database.js';

// Функция для поиска пользователя по email
export async function findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const result = await pool.query(query, [email]);
    return result.rows[0];
}
