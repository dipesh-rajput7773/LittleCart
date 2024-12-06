const Category = require("../models/category");

// Create a new category

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;  
  
      if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
      }

      // Check if the category name already exists
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category name must be unique' });
      }
  
      // Create a new category
      const newCategory = await Category.create({
        name,
      });
  
      return res.status(201).json(newCategory); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
  };
