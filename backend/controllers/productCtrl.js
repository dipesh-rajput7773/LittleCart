const Product = require('../models/Product');
const AttributeValue = require('../models/AttributeValue');
const Attribute = require('../models/Attribute');
const { Op } = require('sequelize');

// Create a new Product with associated Attribute Values and Attributes
const createProduct = async (req, res) => {
  try {
    const { name, description, categoryId, base_price, img, attributeId, attributeValueId } = req.body;

    // Ensure required fields are provided
    if (!name || !categoryId || !base_price) {
      return res.status(400).json({ message: 'Product name, categoryId, and base_price are required' });
    }

    // Create the new Product
    const newProduct = await Product.create({
      name,
      description,
      img,
      categoryId,
      base_price,
    });

    // Directly associate AttributeValues
    const attributeValues = await AttributeValue.findAll({
      where: {
        id: attributeValueId,
        attributeId: { [Op.in]: attributeId }
      }
    });

    await newProduct.setAttributeValues(attributeValues);

    // Directly associate Attributes
    const attributes = await Attribute.findAll({ where: { id: attributeId } });
    await newProduct.setAttributes(attributes);

    return res.status(201).json(newProduct);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

const getAllProduct = async (req,res)=>{
try {
  
  
} catch (error) {
  console.error(error);
    return res.status(500).json({ message: 'Failed to create product', error: error.message });
}
}


module.exports = { createProduct };
