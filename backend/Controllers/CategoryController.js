const Category = require("../Model/CategoryModel");

// Create a new category
exports.createCategory = async (req, res) => {
  const { email, categoryType } = req.body;

  try {
    const newCategory = new Category({ email, categoryType });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get all category types by email
exports.getCategoriesByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const categories = await Category.find({ email });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Update categoryType by email & categoryType
exports.updateCategory = async (req, res) => {
  const { email, categoryType } = req.params;
  const updatedData = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { email, categoryType },
      updatedData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete category by both email and categoryType
exports.deleteCategoryByEmailAndType = async (req, res) => {
  const { email, categoryType } = req.params;

  try {
    const deletedCategory = await Category.findOneAndDelete({
      email,
      categoryType,
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
