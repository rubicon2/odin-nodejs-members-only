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

async function deleteUser(id) {
  // app_messages.user_id ON DELETE CASCADE, no need to delete this user's messages manually.
  // It is done automatically by the db.
  await pool.query('DELETE FROM app_user WHERE id = $1', [id]);
}

async function getUsers() {
  const { rows } = await pool.query(
    'SELECT * FROM app_user ORDER BY last_name, first_name',
  );
  return rows;
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

async function setMember(id, is_member) {
  await pool.query('UPDATE app_user SET is_member = $1 WHERE id = $2', [
    is_member,
    id,
  ]);
}

async function setAdmin(id, is_admin) {
  await pool.query('UPDATE app_user SET is_admin = $1 WHERE id = $2', [
    is_admin,
    id,
  ]);
}

async function addMessage(user_id, title, text) {
  const now = new Date(Date.now()).toISOString();
  await pool.query(
    `INSERT INTO app_message (user_id, title, text, created_time)
       VALUES ($1, $2, $3, $4)`,
    [user_id, title, text, now],
  );
}

async function deleteMessage(id) {
  await pool.query('DELETE FROM app_message WHERE id = $1', [parseInt(id)]);
}

async function getMessages() {
  const { rows } = await pool.query(
    `SELECT
      app_message.id,
      user_id,
      title,
      text,
      app_message.created_time,
      first_name,
      last_name
     FROM app_message JOIN app_user ON app_message.user_id = app_user.id
     ORDER BY app_message.created_time DESC`,
  );
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query('SELECT * FROM app_message WHERE id = $1', [
    id,
  ]);
  return rows[0] || null;
}

export {
  // Users
  addUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserByEmail,
  setMember,
  setAdmin,
  // Messages
  addMessage,
  deleteMessage,
  getMessages,
  getMessageById,
};
