const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth");

router.get("/", ensureAuthenticated, categoryController.list);
router.get(
  "/new",
  ensureAuthenticated,
  ensureAdmin,
  categoryController.newForm,
);
router.post("/", ensureAuthenticated, ensureAdmin, categoryController.create);
router.get(
  "/:id/edit",
  ensureAuthenticated,
  ensureAdmin,
  categoryController.editForm,
);
router.put("/:id", ensureAuthenticated, ensureAdmin, categoryController.update);
router.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  categoryController.delete,
);

module.exports = router;
