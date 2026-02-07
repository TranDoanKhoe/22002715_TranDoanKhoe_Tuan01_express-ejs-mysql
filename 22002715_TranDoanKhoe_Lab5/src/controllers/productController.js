const { v4: uuidv4 } = require("uuid");
const model = require("../models/productModel");

async function list(req, res) {
  const items = await model.listProducts();
  res.json(items);
}

async function get(req, res) {
  const id = req.params.id;
  const item = await model.getProduct(id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

async function create(req, res) {
  const { name, price, url_image } = req.body;
  if (!name || price == null)
    return res.status(400).json({ error: "Invalid input" });
  const item = { id: uuidv4(), name, price, url_image };
  await model.createProduct(item);
  res.status(201).json(item);
}

async function update(req, res) {
  const id = req.params.id;
  const body = req.body;
  const updated = await model.updateProduct(id, body);
  res.json(updated);
}

async function remove(req, res) {
  const id = req.params.id;
  await model.deleteProduct(id);
  res.json({ id });
}

module.exports = { list, get, create, update, remove };
