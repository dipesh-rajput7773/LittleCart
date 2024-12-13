const AttributeValue = require('../models/AttributeValue');
const Attribute = require('../models/Attribute');


const createAttributeValue = async (req, res) => {
  try {
    const { attributeId, value } = req.body;
    
    // Ensure attributeId and value are provided
    if (!attributeId || !value) {
      return res.status(400).json({ message: 'Attribute ID and value are required' });
    }

    // Check if the Attribute exists
    const attribute = await Attribute.findByPk(attributeId);
    if (!attribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }

    // Ensure the value is unique for this attribute
    const existingAttributeValue = await AttributeValue.findOne({ 
      where: { attributeId, value }
    });
    if (existingAttributeValue) {
      return res.status(400).json({ message: 'Attribute value must be unique for this attribute' });
    }

    // Create the new AttributeValue
    const newAttributeValue = await AttributeValue.create({
      attributeId,
      value
    });

    return res.status(201).json(newAttributeValue); // Respond with the created attribute value
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create AttributeValue', error: error.message });
  }
};

module.exports = { createAttributeValue };
