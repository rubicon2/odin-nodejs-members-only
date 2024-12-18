import { addUser } from '../db/queries.mjs';
import { validationResult } from 'express-validator';

function getSignUp(req, res, next) {
  const { formData, errors } = req.session;
  res.render('sign-up', {
    title: 'Sign Up',
    errors,
    formData,
  });
  next();
}

async function postSignUp(req, res, next) {
  try {
    const result = validationResult(req);
    const { email, first_name, last_name, password, confirm_password } =
      req.body;
    if (result.isEmpty()) {
      await addUser(email, first_name, last_name, password);
      res.status(404).redirect('/');
    } else {
      // Need to keep data in session to load it back into the sign-up view.
      // Nothing more annoying than a form emptying due to a vaidation error!
      req.session.formData = {
        email,
        first_name,
        last_name,
        password,
        confirm_password,
      };
      req.session.errors = result.array();
      res.status(400).redirect('/sign-up');
    }
  } catch (error) {
    next(error);
  }
}

export { getSignUp, postSignUp };
