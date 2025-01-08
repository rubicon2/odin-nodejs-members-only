import { getUserByEmail } from '../db/queries.mjs';
import { body } from 'express-validator';

// Allows multiple names, seperated by hyphens or single spaces.
// eslint-disable-next-line no-useless-escape -- the regex doesn't work in the client side version unless the escape is there, so keeping it on the server side too for parity.
const nameRegex = /^[a-zA-Z]+([ \-][a-zA-Z]+)*$/;

const validateSignUpData = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is a required field')
    .isEmail()
    .withMessage('Email must be in email format')
    .custom(async (value) => {
      const existingUser = await getUserByEmail(value);
      if (existingUser) throw new Error('User with that email already exists');
    }),
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is a required field')
    .custom((value) => nameRegex.test(value))
    .withMessage(
      'First name must consist of letters, single spaces and hyphens only',
    ),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is a required field')
    .custom((value) => nameRegex.test(value))
    .withMessage(
      'Last name must consist of letters, single spaces and hyphens only',
    ),
  body('password')
    .notEmpty()
    .withMessage('Password is a required field')
    .isStrongPassword()
    .withMessage(
      'Password is not strong enough. It should be at least 8 characters with a mix of uppercase and lowercase letters, digits and symbols - at least one of each',
    ),
  body('confirm_password')
    .notEmpty()
    .withMessage('Confirm password is a required field')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match'),
];

const validateMessageData = [
  body('title').trim().notEmpty().withMessage('Message title required'),
  body('text').trim().notEmpty().withMessage('Message text required'),
];

export { validateSignUpData, validateMessageData };
