const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(302)
  res.redirect("/usuarios/login");
};

export default isAuth;
