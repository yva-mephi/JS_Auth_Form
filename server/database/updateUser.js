import bcrypt from 'bcrypt';
import { pool } from './database.js';

export async function updateUser(userId, dataToSend) {
    console.log(userId)

    const user = await pool.query('SELECT * FROM users WHERE id = $1;', [userId]);
    if (!user.rows[0]) {
        throw new Error('User not found');
    }

    // Хешируем пароль, если он есть в dataToSend
    if (dataToSend.password) {
        dataToSend.password = await bcrypt.hash(dataToSend.password, 10);
    }

    const fields = [];
    const values = [];
    let counter = 1;

    for (const [key, value] of Object.entries(dataToSend)) {
        if (value !== undefined && key !== 'id') {
            fields.push(`${key} = $${counter}`);
            values.push(value);
            counter++;
        }
    }

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    values.push(userId);

    const query = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE id = $${counter}
        RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
}