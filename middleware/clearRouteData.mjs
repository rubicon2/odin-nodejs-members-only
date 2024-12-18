function clearRouteData(req, res, next) {
  // Clear out formData, messages and errors - any data that pertains to a specific route.
  // Do not want formData persisting across routes and automatically filling in other forms
  // than originally entered on, or errors for one form showing up when loading a different route.
  delete req.session.formData;
  delete req.session.messages;
  delete req.session.errors;
  req.session.save((error) => {
    if (error) next(error);
  });
  // This middleware must be at the end of the chain - response should already be sent by a previous function.
  // So we will not call next(), but end the response instead.
  res.end();
}

export default clearRouteData;
