import pool from './pool.mjs';
import bcryptjs from 'bcryptjs';

async function addUser(email, first_name, last_name, password) {
  const now = new Date(Date.now()).toISOString();
  const hashed_salted_password = await bcryptjs.hash(password, 10);
  await pool.query(
    `INSERT INTO app_user (email, first_name, last_name, password, created_time) 
     VALUES ($1, $2, $3, $4, $5);`,
    [email, first_name, last_name, hashed_salted_password, now],
  );
}

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM app_user WHERE id = $1', [
    id,
  ]);
  return rows[0] || null;
}

async function getUserByEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM app_user WHERE email = $1;',
    [email],
  );
  return rows[0] || null;
}

export { addUser, getUserById, getUserByEmail };
