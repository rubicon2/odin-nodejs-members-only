import { validationResult } from 'express-validator';

function storeFormErrors(req, res, next) {
  const result = validationResult(req);
  // Structure data so we can put errors next to relevant form ields.
  req.session.errors = result.array().reduce(
    (obj, current) => {
      return {
        ...obj,
        [current.path]: current.msg,
      };
    },
    // And hold an array of the same messages to ejs can easily loop through.
    { array: result.array().map((error) => error.msg) },
  );
  next();
}

export default storeFormErrors;
