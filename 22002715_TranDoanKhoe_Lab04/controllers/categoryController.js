const categoryService = require("../services/categoryService");

exports.list = (req, res) => {
  const categories = categoryService.findAll();
  res.render("categories/list", { categories });
};

exports.newForm = (req, res) => res.render("categories/new");

exports.create = (req, res) => {
  categoryService.create({
    name: req.body.name,
    description: req.body.description,
  });
  res.redirect("/categories");
};

exports.editForm = (req, res) => {
  const c = categoryService.findById(req.params.id);
  if (!c) return res.status(404).send("Not found");
  res.render("categories/edit", { category: c });
};

exports.update = (req, res) => {
  categoryService.update(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.redirect("/categories");
};

exports.delete = (req, res) => {
  categoryService.delete(req.params.id);
  res.redirect("/categories");
};
