import { validationResult } from 'express-validator';

function storeValidationErrors(req, res, next) {
  const result = validationResult(req);
  // Structure data so we can put errors next to relevant form fields.
  req.session.errors = result.array().reduce(
    (obj, current) => {
      return {
        ...obj,
        [current.path]: current.msg,
      };
    },
    // And hold an array of the same messages so ejs can easily loop through.
    { array: result.array().map((error) => error.msg) },
  );
  next();
}

export default storeValidationErrors;
