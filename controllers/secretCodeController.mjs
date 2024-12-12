import pool from '../db/pool.mjs';
import bcrypt from 'bcryptjs';

function getSecretCodeSelect(req, res) {
  res.render('secret-code/secret-code-select', {
    title: 'Secret Code Select',
    user: req.user,
  });
}

function getMemberCodeForm(req, res) {
  res.render('secret-code/member', {
    title: 'Member Code Entry',
    user: req.user,
    messages: req.session.messages,
  });
}

function getAdminCodeForm(req, res) {
  res.render('secret-code/admin', {
    title: 'Admin Code Entry',
    user: req.user,
    messages: req.session.messages,
  });
}

function getSuccess(req, res) {
  res.render('secret-code/success', { title: 'Success', user: req.user });
}

async function postMemberCodeForm(req, res, next) {
  try {
    const { user } = req;
    const { rows } = await pool.query(
      `SELECT * FROM app_password WHERE type = 'member'`,
    );
    for (const row of rows) {
      const match = await bcrypt.compare(req.body.secret_code, row.password);
      if (match) {
        await pool.query('UPDATE app_user SET is_member = true WHERE id = $1', [
          user.id,
        ]);
        res.status(303).redirect('/secret-code/success');
      }
    }
    if (!req.session.messages) req.session.messages = [];
    req.session.messages.push('The code entered was incorrect');
    res.status(401).redirect('/secret-code/member');
  } catch (error) {
    next(error);
  }
}

async function postAdminCodeForm(req, res, next) {
  try {
    const { user } = req;
    const { rows } = await pool.query(
      `SELECT * FROM app_password WHERE type = 'admin'`,
    );
    for (const row of rows) {
      const match = await bcrypt.compare(req.body.secret_code, row.password);
      if (match) {
        await pool.query(
          'UPDATE app_user SET is_admin = true, is_member = true WHERE id = $1',
          [user.id],
        );
        res.status(303).redirect('/secret-code/success');
      }
    }
    if (!req.session.messages) req.session.messages = [];
    req.session.messages.push('The code entered was incorrect');
    res.status(401).redirect('/secret-code/admin');
  } catch (error) {
    next(error);
  }
}

export {
  getSecretCodeSelect,
  getMemberCodeForm,
  getAdminCodeForm,
  getSuccess,
  postMemberCodeForm,
  postAdminCodeForm,
};
