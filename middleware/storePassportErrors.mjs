function storePassportErrors(req, res, next) {
  // Turn passport errors into a data structure consistent with form validation errors.
  // This way, we can re-use the errors view instead of having a separate one for passport messages.
  // But it is rather annoying that we can't store what field the error relates to.
  // Trying to pass anything other than a string as a message just doesn't work.
  const array = req.session.messages ? [...req.session.messages] : [];
  const obj = array.reduce((obj, msg) => {
    // Hacky but don't really see any other way to tell the view
    // which field is incorrect. Passport only seems to let us set a string message.
    if (msg === 'The email and password do not match') {
      return {
        ...obj,
        password: msg,
      };
    } else {
      return {
        ...obj,
        email: msg,
      };
    }
  }, {});
  req.session.errors = { ...obj, array };
  delete req.session.messages;
  req.session.save();
  next();
}

export default storePassportErrors;
