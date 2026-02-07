const express = require("express");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/products", productRoutes);

app.get("/api-info", (req, res) => {
  res.json({ ok: true, message: "Node DynamoDB CRUD API" });
});

module.exports = app;
