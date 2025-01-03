const Category = require("../models/category");
const slugify = require('slugify')
// Create a new category using an arrow function

const addCategory = async (req, res) => {
  try {
    let { name, short_content } = req.body;
    
    if (!name || name === "")
      return res.status(400).json({ message: "Name is a required field", success: false });

    let img = null;
    if (req.file) {
      img = req.file.filename;  
    }

    let slug = slugify(name, { lower: true });

    // Create the category in the database
    let data = await Category.create({
      ...req.body,
      img,    
      slug,         
      meta_title: name, 
      short_content: short_content || null,  
      meta_description: short_content || null,  
      meta_key: null  
    });

    // Respond with the created category
    res.status(201).json({ data, success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message, success: false });
  }
};

  module.exports = {addCategory };
