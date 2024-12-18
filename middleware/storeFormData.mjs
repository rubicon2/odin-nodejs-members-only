function storeFormData(req, res, next) {
  req.session.formData = { ...req.body };
  next();
}

export default storeFormData;
