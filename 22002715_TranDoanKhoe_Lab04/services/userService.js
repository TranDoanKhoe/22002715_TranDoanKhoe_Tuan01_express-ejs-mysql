const userRepo = require("../repositories/userRepo");

exports.authenticate = (username, password) =>
  userRepo.authenticate(username, password);
