const categoryRepo = require("../repositories/categoryRepo");

exports.create = (data) => categoryRepo.create(data);
exports.findAll = () => categoryRepo.findAll();
exports.findById = (id) => categoryRepo.findById(id);
exports.update = (id, data) => categoryRepo.update(id, data);
exports.delete = (id) => categoryRepo.delete(id);
