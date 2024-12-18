function getLogIn(req, res, next) {
  // Stop user logging in if they are already logged in.
  if (req.user) {
    throw new Error('User is already logged in');
  }
  const { formData, messages } = req.session;
  res.render('log-in', {
    title: 'Login',
    user: req.user,
    formData,
    messages,
  });
  next();
}

function postLogIn(req, res, next) {
  // Save the form data into the session, can be used in failure redirect.
  req.session.formData = {
    email: req.body.email,
    password: req.body.password,
  };
  // Call passport.authenticate in next stop on the route.
  next();
}

export { getLogIn, postLogIn };
