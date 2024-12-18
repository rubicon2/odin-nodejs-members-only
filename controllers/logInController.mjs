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

export { getLogIn };
