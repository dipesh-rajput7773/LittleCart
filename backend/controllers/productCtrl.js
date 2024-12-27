const Product = require("../models/Product");
const sequelize = require("../_db");
const AttributeValue = require("../models/AttributeValue");
const Attribute = require("../models/Attribute");
const { Op } = require("sequelize");
const Category = require("../models/Category");
const upload = require("../middleware/uploadMiddleware");

const createProduct = async (req, res) => {
  console.log(req.body)
  console.log(req.file)
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

    if (typeof attributeId === "string") {
      attributeId = attributeId.split(",").map(Number);
    }

    if (typeof attributeValueId === "string") {
      attributeValueId = attributeValueId.split(",").map(Number);
    }

    if (!name || !categoryId || !base_price) {
      return res.status(400).json({
        message: "Product name, categoryId, and base_price are required",
      });
    }

    const img = req.file.path;

    // Generate slug based on the product name
    const slug = generateSlug(name);  // Ensure slug is created

    // Create the new Product
    const newProduct = await Product.create({
      name,
      description,
      img,
      categoryId,
      base_price,
      slug,  // Include the generated slug here
    });

    // Directly associate AttributeValues
    const attributeValues = await AttributeValue.findAll({
      where: {
        id: Array.isArray(attributeValueId)
          ? { [Op.in]: attributeValueId }
          : attributeValueId,
        attributeId: {
          [Op.in]: Array.isArray(attributeId) ? attributeId : [attributeId],
        },
      },
    });
    await newProduct.setAttributeValues(attributeValues);

    // Directly associate Attributes
    const attributes = await Attribute.findAll({
      where: {
        id: Array.isArray(attributeId)
          ? { [Op.in]: attributeId }
          : [attributeId],
      },
    });
    await newProduct.setAttributes(attributes);

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Utility function to generate slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""); // Convert name to a URL-friendly slug
}

const createVariationProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required." });
    }

    let {
      name,
      description,
      categoryId,
      base_price,
      attributeId,
      attributeValueId,
    } = req.body;

    if (typeof attributeId === "string") {
      attributeId = attributeId.split(",").map(Number);
    }

    if (typeof attributeValueId === "string") {
      attributeValueId = attributeValueId.split(",").map(Number);
    }

    if (!name || !categoryId || !base_price) {
      return res
        .status(400)
        .json({
          message: "Product name, categoryId, and base_price are required",
        });
    }

    const img = req.file.path;

    // Step 1: Create the parent product (the main product)
    const parentProduct = await Product.create({
      name,
      description,
      img,
      categoryId,
      base_price,
      slug: generateSlug(name), // Automatically generate the slug
    });

    // Step 2: Fetch attribute values to generate variations
    const attributeValues = await AttributeValue.findAll({
      where: {
        id: { [Op.in]: attributeValueId },
        attributeId: { [Op.in]: attributeId },
      },
    });

    // Step 3: Create all possible variations based on the attribute combinations
    const variations = [];

    // Generate all combinations of attribute values for variations
    const attributeCombinations = getCombinations(attributeValues);

    for (let combination of attributeCombinations) {
      const variationName = generateVariationName(combination); // e.g., Red-S, Blue-M
      const variationSlug = generateSlug(variationName);

      const variation = await Product.create({
        name: variationName,
        description,
        img, // you can use different images per variation if needed
        categoryId,
        base_price, // You can calculate or modify the price per variation
        parentId: parentProduct.id, // Link this variation to the parent product
        slug: variationSlug,
      });

      variations.push(variation);
    }

    return res.status(201).json({
      message: "Variation products created successfully",
      parentProduct,
      variations,
    });
  } catch (error) {
    console.error("Error creating variation products:", error);
    return res
      .status(500)
      .json({
        message: "Failed to create product variations",
        error: error.message,
      });
  }
};

// Utility function to generate slugs
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""); // Convert name to a URL-friendly slug
}

// Utility function to generate variation names (e.g., Red-S)
function generateVariationName(combination) {
  return combination.map((value) => value.name).join("-");
}

// Utility function to generate all combinations of attributes
function getCombinations(attributeValues) {
  const combinations = [];
  const groupedByAttributeId = attributeValues.reduce((acc, value) => {
    if (!acc[value.attributeId]) {
      acc[value.attributeId] = [];
    }
    acc[value.attributeId].push(value);
    return acc;
  }, {});

  const attributesIds = Object.keys(groupedByAttributeId);

  function combine(arr, idx = 0, current = []) {
    if (idx === attributesIds.length) {
      combinations.push(current);
      return;
    }

    const attributeId = attributesIds[idx];
    const values = groupedByAttributeId[attributeId];

    for (let value of values) {
      combine(arr, idx + 1, [...current, value]);
    }
  }

  combine([], 0, []);
  return combinations;
}

const updateProduct = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  try {
    const productId = req.params.id;
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
      img = req.file.path; // If there's a new file, use the new image path
    } else {
      img = product.img; // If no new file, keep the old image
    }

    // Update product fields (with new data or keep old if not provided)
    product.name = name || product.name;
    product.description = description || product.description;
    product.categoryId = categoryId || product.categoryId;
    product.base_price = base_price || product.base_price;
    product.img = img || product.img; // Keep the old image if no new one is provided

    // Save the updated product
    await product.save();

    // Handle updating associated AttributeValues
    if (attributeId && attributeValueId) {
      if (typeof attributeId === "string") {
        attributeId = attributeId.split(",").map(Number);
      }

      if (typeof attributeValueId === "string") {
        attributeValueId = attributeValueId.split(",").map(Number);
      }

      const attributeValues = await AttributeValue.findAll({
        where: {
          id: { [Op.in]: attributeValueId },
          attributeId: { [Op.in]: attributeId },
        },
      });

      await product.setAttributeValues(attributeValues); // Update the association

      const attributes = await Attribute.findAll({
        where: { id: { [Op.in]: attributeId } },
      });

      await product.setAttributes(attributes); // Update the association
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
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
        const attributeValueMap = product.AttributeValues.reduce(
          (map, value) => {
            if (!map[value.attributeId]) {
              map[value.attributeId] = [];
            }
            map[value.attributeId].push(value);
            return map;
          },
          {}
        );

        // Attach values to corresponding Attributes
        const groupedAttributes = product.Attributes.map((attribute) => ({
          id: attribute.id,
          name: attribute.name,
          values: attributeValueMap[attribute.id] || [],
        }));

        return {
          id: product.id,
          name: product.name,
          image_url: product.img,
          categoryId: product.categoryId,
          Category: product.Category,
          Attributes: groupedAttributes,
        };
      });
    }

    const mdata = transformData(products || []);
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

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    // Start a transaction
    const transaction = await sequelize.transaction();

    // Fetch the product with its associated relations to check if it exists
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: AttributeValue, // Includes related attributes and values
        },
        {
          model: Attribute,
        },
      ],
      transaction, // Ensure the query is part of the transaction
    });

    if (!product) {
      // If the product doesn't exist, send a 404 error
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Remove associations with AttributeValues and Attributes without deleting them
    await product.setAttributeValues([], { transaction });
    await product.setAttributes([], { transaction });

    // If you want to delete related records (e.g., AttributeValues or Attributes), uncomment below:
    // await AttributeValue.destroy({
    //   where: { id: product.AttributeValues.map(av => av.id) },
    //   transaction,
    // });

    if (product.img) {
      const fs = require("fs");
      fs.unlinkSync(product.img);
    }

    await product.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    // In case of any errors, rollback the transaction
    console.error("Error deleting product:", error);
    await transaction.rollback();

    return res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createVariationProducts,
};
