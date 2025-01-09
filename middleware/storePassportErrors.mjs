function storePassportErrors(req, res, next) {
  // Turn passport errors into a data structure consistent with form validation errors.
  // This way, we can re-use the errors view instead of having a separate one for passport messages.

  // In case there are no messages, this will stop array map throwing an error.
  if (!req.session.messages) req.session.messages = [];

  // Each message is a JSON string due to passport only allowing string messages.
  const array = req.session.messages.map((message) => JSON.parse(message));
  const obj = array.reduce((obj, current) => {
    return {
      ...obj,
      [current.path]: current.msg,
    };
  }, {});

  req.session.errors = { ...obj, array };
  delete req.session.messages;
  req.session.save();
  next();
}

export default storePassportErrors;
