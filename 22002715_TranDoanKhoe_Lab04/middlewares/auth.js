exports.ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) return next();
  res.redirect("/login");
};

exports.ensureAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === "admin")
    return next();
  res.status(403).send("Forbidden: admin only");
};
