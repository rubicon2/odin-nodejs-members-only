function getLogIn(req, res, next) {
  // Stop user logging in if they are already logged in.
  if (req.user) {
    throw new Error('User is already logged in');
  }
  const { formData, errors } = req.session;
  res.render('log-in', {
    title: 'Login',
    user: req.user,
    formData,
    errors,
  });
  next();
}

export { getLogIn };
