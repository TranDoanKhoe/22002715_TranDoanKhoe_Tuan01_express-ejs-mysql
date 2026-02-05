const userService = require("../services/userService");

exports.showLogin = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = userService.authenticate(username, password);
  if (!user) {
    return res.render("login", { error: "Invalid credentials" });
  }
  req.session.user = user;
  res.redirect("/products");
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};
