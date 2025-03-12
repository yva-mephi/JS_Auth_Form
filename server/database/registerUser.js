import bcrypt from 'bcrypt';
import { pool } from './database.js';

export async function registerUser(email, password, firstName, lastName, dateOfBirth, gender, provider, providerId) {
  const userExists = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
  if (userExists.rows.length > 0) {
    throw new Error('Пользователь с таким email уже существует');
  }

  // Хешируем пароль, если он предоставлен
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const query = `
        INSERT INTO users (email, password, first_name, last_name, date_of_birth, gender, provider, provider_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
  const values = [email, hashedPassword, firstName, lastName, dateOfBirth, gender, provider, providerId];
  const result = await pool.query(query, values);
  return result.rows[0];
}