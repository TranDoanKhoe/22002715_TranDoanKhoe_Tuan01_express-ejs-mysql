const productService = require("../services/productService");
const categoryService = require("../services/categoryService");

exports.list = (req, res) => {
  const { q, category, minPrice, maxPrice, page } = req.query;
  const result = productService.findAll({
    q,
    category,
    minPrice,
    maxPrice,
    page,
  });
  const categories = categoryService.findAll();
  res.render("products/list", {
    products: result.items,
    pagination: result.pagination,
    categories,
  });
};

exports.newForm = (req, res) => {
  const categories = categoryService.findAll();
  res.render("products/new", { categories });
};

exports.create = (req, res) => {
  const file = req.file;
  const data = {
    name: req.body.name,
    price: Number(req.body.price) || 0,
    quantity: Number(req.body.quantity) || 0,
    categoryId: req.body.categoryId || null,
    url_image: file ? "/uploads/" + file.filename : "",
  };
  productService.create(data);
  res.redirect("/products");
};

exports.editForm = (req, res) => {
  const product = productService.findById(req.params.id);
  if (!product) return res.status(404).send("Not found");
  const categories = categoryService.findAll();
  res.render("products/edit", { product, categories });
};

exports.update = (req, res) => {
  const file = req.file;
  const data = {
    name: req.body.name,
    price: Number(req.body.price) || 0,
    quantity: Number(req.body.quantity) || 0,
    categoryId: req.body.categoryId || null,
    url_image: file ? "/uploads/" + file.filename : req.body.currentImage,
  };
  productService.update(req.params.id, data);
  res.redirect("/products");
};

exports.delete = (req, res) => {
  productService.softDelete(req.params.id);
  res.redirect("/products");
};
