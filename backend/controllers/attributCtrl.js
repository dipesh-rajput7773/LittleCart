const Attribute = require("../models/Attribute");

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

  module.exports = { createAttribute };
