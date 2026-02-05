const { v4: uuidv4 } = require("uuid");

const PAGE_SIZE = 6;

const products = [
  {
    id: uuidv4(),
    name: "Sample Product A",
    price: 199.99,
    quantity: 10,
    categoryId: null,
    url_image: "",
    isDeleted: false,
    createdAt: new Date().toISOString(),
  },
];

exports.create = (data) => {
  const item = Object.assign(
    {
      id: uuidv4(),
      isDeleted: false,
      createdAt: new Date().toISOString(),
    },
    data,
  );
  products.push(item);
  return item;
};

exports.findAll = (filters, page = 1) => {
  let items = products.filter((p) => !p.isDeleted);
  if (filters) {
    if (filters.q)
      items = items.filter((p) =>
        p.name.toLowerCase().includes(filters.q.toLowerCase()),
      );
    if (filters.categoryId)
      items = items.filter((p) => p.categoryId === filters.categoryId);
    if (typeof filters.minPrice !== "undefined")
      items = items.filter((p) => p.price >= filters.minPrice);
    if (typeof filters.maxPrice !== "undefined")
      items = items.filter((p) => p.price <= filters.maxPrice);
  }
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const p = Math.min(Math.max(1, page), pages);
  const start = (p - 1) * PAGE_SIZE;
  const slice = items.slice(start, start + PAGE_SIZE);
  return { items: slice, pagination: { total, pages, page: p } };
};

exports.findById = (id) => products.find((p) => p.id === id && !p.isDeleted);

exports.update = (id, data) => {
  const idx = products.findIndex((p) => p.id === id && !p.isDeleted);
  if (idx === -1) return null;
  products[idx] = Object.assign(products[idx], data);
  return products[idx];
};

exports.softDelete = (id) => {
  const p = products.find((x) => x.id === id && !x.isDeleted);
  if (p) p.isDeleted = true;
  return p;
};
