const productRepo = require("../repositories/productRepo");

function parseNumber(v) {
  const n = Number(v);
  return isNaN(n) ? undefined : n;
}

exports.create = (data) => productRepo.create(data);

exports.findAll = ({ q, category, minPrice, maxPrice, page }) => {
  const filters = {};
  if (q) filters.q = q;
  if (category) filters.categoryId = category;
  if (minPrice) filters.minPrice = parseNumber(minPrice);
  if (maxPrice) filters.maxPrice = parseNumber(maxPrice);
  const pageNum = Number(page) || 1;
  return productRepo.findAll(filters, pageNum);
};

exports.findById = (id) => productRepo.findById(id);

exports.update = (id, data) => productRepo.update(id, data);

exports.softDelete = (id) => productRepo.softDelete(id);
