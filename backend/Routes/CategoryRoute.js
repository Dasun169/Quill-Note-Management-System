const express = require("express");
const router = express.Router();
const CategoryController = require("../Controllers/CategoryController");

router.post("/create", CategoryController.createCategory);
router.get("/all/:email", CategoryController.getCategoriesByEmail);
router.put("/update/:email/:categoryType", CategoryController.updateCategory);
router.delete(
  "/delete/:email/:categoryType",
  CategoryController.deleteCategoryByEmailAndType
);

module.exports = router;
