const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const productController = require("../controllers/productController");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", ensureAuthenticated, productController.list);
router.get("/new", ensureAuthenticated, ensureAdmin, productController.newForm);
router.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("image"),
  productController.create,
);
router.get(
  "/:id/edit",
  ensureAuthenticated,
  ensureAdmin,
  productController.editForm,
);
router.put(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("image"),
  productController.update,
);
router.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  productController.delete,
);

module.exports = router;
