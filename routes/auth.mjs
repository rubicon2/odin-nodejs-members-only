import pool from '../db/pool.mjs';

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new Error('User is not authenticated');
  }
}

async function isMember(req, res, next) {
  try {
    if (!req.user)
      throw new Error(
        'You cannot access this resource as you are not logged in',
      );
    const { rows } = await pool.query('SELECT * FROM app_user WHERE id = $1', [
      req.user.id,
    ]);
    const user = rows[0];
    if (user.is_member) next();
    throw new Error('You cannot access this resource as you are not a member');
  } catch (error) {
    next(error);
  }
}

async function isAdmin(req, res, next) {
  try {
    if (!req.user)
      throw new Error(
        'You cannot access this resource as you are not logged in',
      );
    const { rows } = await pool.query('SELECT * FROM app_user WHERE id = $1', [
      req.user.id,
    ]);
    const user = rows[0];
    if (user.is_admin) next();
    throw new Error('You cannot access this resource as you are not an admin');
  } catch (error) {
    next(error);
  }
}

export { isAuth, isMember, isAdmin };
