import bcrypt from 'bcrypt';
import { pool } from './database.js';

// Функция для обновления данных пользователя
export async function updateUser(userId, updates) {
    // Проверяем, существует ли пользователь
    const user = await pool.query('SELECT * FROM users WHERE id = $1;', [userId]);
    if (!user.rows[0]) {
        throw new Error('User not found');
    }

    // Хешируем пароль, если он есть в updates
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    const fields = [];
    const values = [];
    let counter = 1;

    // Формируем динамический запрос
    for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
            fields.push(`${key} = $${counter}`);
            values.push(value);
            counter++;
        }
    }

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const query = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = $${counter}
    RETURNING *;
  `;
    values.push(userId);

    const result = await pool.query(query, values);
    return result.rows[0];
}