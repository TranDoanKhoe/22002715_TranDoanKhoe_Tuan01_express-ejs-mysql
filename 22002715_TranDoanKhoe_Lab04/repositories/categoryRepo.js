const { v4: uuidv4 } = require("uuid");

const categories = [
  { categoryId: uuidv4(), name: "Uncategorized", description: "" },
];

exports.create = (data) => {
  const item = Object.assign({ categoryId: uuidv4() }, data);
  categories.push(item);
  return item;
};

exports.findAll = () => categories.slice();
exports.findById = (id) => categories.find((c) => c.categoryId === id);
exports.update = (id, data) => {
  const idx = categories.findIndex((c) => c.categoryId === id);
  if (idx === -1) return null;
  categories[idx] = Object.assign(categories[idx], data);
  return categories[idx];
};
exports.delete = (id) => {
  const idx = categories.findIndex((c) => c.categoryId === id);
  if (idx === -1) return null;
  const removed = categories.splice(idx, 1);
  return removed[0];
};
