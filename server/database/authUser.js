import bcrypt from 'bcrypt';
import { pool } from './database.js';

export async function authUser(email, password) {
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = userResult.rows[0];

        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }

        // Сравниваем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Неверный пароль');
        }

        const { password: _, ...userData } = user; // Убираем пароль из ответа
        return userData;
    } catch (error) {
        console.error('Ошибка в authUser:', error);
        throw error;
    }
}