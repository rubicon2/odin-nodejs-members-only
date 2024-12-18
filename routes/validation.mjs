import { getUserByEmail } from '../db/queries.mjs';
import { body } from 'express-validator';

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
    .isAlpha()
    .withMessage('First name must consist of alphabetical characters only'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is a required field')
    .isAlpha()
    .withMessage('Last name must consist of alphabetical characters only'),
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
