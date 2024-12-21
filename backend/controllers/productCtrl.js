const Product = require("../models/Product");
const AttributeValue = require("../models/AttributeValue");
const Attribute = require("../models/Attribute");
const { Op } = require("sequelize");
const Category = require("../models/Category");
const upload = require('../middleware/uploadMiddleware')



const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required.",
      });
    }

    let {
      name,
      description,
      categoryId,
      base_price,
      attributeId,
      attributeValueId,
    } = req.body;

    // Ensure attributeId and attributeValueId are arrays (if necessary)
    if (typeof attributeId === 'string') {
      attributeId = attributeId.split(',').map(Number); // Convert to array of numbers if it's a comma-separated string
    }

    if (typeof attributeValueId === 'string') {
      attributeValueId = attributeValueId.split(',').map(Number); // Convert to array of numbers if it's a comma-separated string
    }

    // Ensure required fields are provided
    if (!name || !categoryId || !base_price) {
      return res.status(400).json({
        message: "Product name, categoryId, and base_price are required",
      });
    }

    const img = req.file.path;

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
        id: Array.isArray(attributeValueId) ? { [Op.in]: attributeValueId } : attributeValueId,
        attributeId: { [Op.in]: Array.isArray(attributeId) ? attributeId : [attributeId] },
      },
    });
    await newProduct.setAttributeValues(attributeValues);

    // Directly associate Attributes
    const attributes = await Attribute.findAll({
      where: { id: Array.isArray(attributeId) ? { [Op.in]: attributeId } : [attributeId] },
    });
    await newProduct.setAttributes(attributes);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;  // The product ID comes from the URL
    const {
      name,
      description,
      categoryId,
      base_price,
      attributeId,
      attributeValueId,
    } = req.body;

    // Ensure the product exists
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    
    let img;
    if (req.file) {
      img = req.file.path;  
    } else {
      img = product.img; 
    }

    product.name = name || product.name;  // If no new name, keep the old one
    product.description = description || product.description;
    product.categoryId = categoryId || product.categoryId;
    product.base_price = base_price || product.base_price;
    product.img = img;  // If new image, update, otherwise keep the old one
    
    await product.save();  // Save the updated product

    // Handle updating associated AttributeValues
    if (attributeId && attributeValueId) {
      if (typeof attributeId === 'string') {
        attributeId = attributeId.split(',').map(Number);  // Convert to array of numbers
      }

      if (typeof attributeValueId === 'string') {
        attributeValueId = attributeValueId.split(',').map(Number);  // Convert to array of numbers
      }

      // Get the new attribute values
      const attributeValues = await AttributeValue.findAll({
        where: {
          id: { [Op.in]: attributeValueId },
          attributeId: { [Op.in]: attributeId },
        },
      });

      // Update the association between product and attribute values
      await product.setAttributeValues(attributeValues);

      // Get the new attributes (if provided)
      const attributes = await Attribute.findAll({
        where: { id: { [Op.in]: attributeId } },
      });

      // Update the association between product and attributes
      await product.setAttributes(attributes);
    }

    // Respond with the updated product
    return res.status(200).json({product,message: " updated product",});

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};



const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Attribute,
        },
        {
          model: AttributeValue,
        },
      ],
    });
     
    function transformData(data) {
      return data.map((product) => {

        const attributeValueMap = product.AttributeValues.reduce((map, value) => {
          if (!map[value.attributeId]) {
            map[value.attributeId] = [];
          }
          map[value.attributeId].push(value);
          return map;
        }, {});
    
        // Attach values to corresponding Attributes
        const groupedAttributes = product.Attributes.map((attribute) => ({
          id: attribute.id,
          name: attribute.name,
          values: attributeValueMap[attribute.id] || [],
        }));
    
        return {
          id: product.id,
          name: product.name,
          image_url:product.img,
          categoryId: product.categoryId,
          Category: product.Category,
          Attributes: groupedAttributes,
        };
      });
    }

    const mdata = transformData(products || [])
    return res.json(mdata);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch product by its primary key (ID), including related models
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
        },
        {
          model: Attribute,
        },
        {
          model: AttributeValue,
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Transform the product data similar to how we do in `getAllProduct`
    function transformData(product) {
      const attributeValueMap = product.AttributeValues.reduce((map, value) => {
        if (!map[value.attributeId]) {
          map[value.attributeId] = [];
        }
        map[value.attributeId].push(value);
        return map;
      }, {});

      // Attach values to corresponding Attributes
      const groupedAttributes = product.Attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        values: attributeValueMap[attribute.id] || [],
      }));

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.img,
        categoryId: product.categoryId,
        Category: product.Category,
        Attributes: groupedAttributes,
      };
    }

    const transformedProduct = transformData(product);

    return res.json(transformedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProduct, getAllProduct, getProductById,updateProduct};
