const express = require("express");
const router = express.Router();

const productRoutes = require("./products");
const authRoutes = require("./auth");
const categoryRoutes = require("./categories");

router.use("/", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

router.get("/", (req, res) => res.redirect("/products"));

module.exports = router;
