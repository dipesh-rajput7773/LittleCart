const Attribute = require("../models/Attribute");
const AttributeValue = require("../models/AttributeValue");

// Create a new Attribute

const createAttribute = async (req, res) => {
    try {
      const { name,description } = req.body;  
      if (!name) {
        return res.status(400).json({ message: 'Attribute name is required' });
      }
     
      const existingAttribute = await Attribute.findOne({ where: { name } });
      if (existingAttribute) {
        return res.status(400).json({ message: 'Attribute name must be unique' });
      }
  
      // Create a new Attribute
      const newAttribute = await Attribute.create({
        name,description
      });
  
      return res.status(201).json(newAttribute); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create Attribute', error: error.message });
    }
  };


  const getAttributeWithValues = async (req, res) => {
    try {
      const { id } = req.params; 

      const attribute = await Attribute.findOne({
        where: { id },
        include: {
          model: AttributeValue,
          as: 'attribute_values', 
          required: true,
          attributes: ['value'], 
        },
      });
      
      if (!attribute) {
        return res.status(404).json({ message: 'Attribute not found' });
      }
  
      return res.status(200).json(attribute);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to retrieve Attribute with its values' });
    }
  };

const getAllAtributeWithoutValue = async(req,res)=>{
  try {
    let data = await Attribute.findAll({});
    res.status(200).json({ data, success: true });
  } catch (err) {
    res.status(500).json({ err: err.message, success: false });
  }
}


  module.exports = { createAttribute,getAttributeWithValues,getAllAtributeWithoutValue };
