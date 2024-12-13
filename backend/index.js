const express = require('express');
const cors = require('cors');
const sequelize = require('./_db');
const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductAttribute = require('./models/ProductAttribute');
const Attribute = require('./models/Attribute');
const AttributeValue = require('./models/AttributeValue');

// const Image = require('./models/Image');
const ProductAttributeValue = require('./models/ProductAttributeValue');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/user', require('./routes/authRoute'));
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/attributeRoute'));
app.use('/api', require('./routes/attributeValueRoute'));
app.use('/api', require('./routes/productRoute'));


app.get("/testprod", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Attribute,
          // include: [
          //   {
          //     model: AttributeValue,
          //   },
          // ],
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
});


Category.hasMany(Product, {
  foreignKey: "categoryId",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

Attribute.hasMany(AttributeValue, {
  foreignKey: "attributeId",
});

AttributeValue.belongsTo(Attribute, {
  foreignKey: "attributeId",
});

Product.belongsToMany(Attribute, {
  through: ProductAttribute,
  foreignKey: "productId",
});

Attribute.belongsToMany(Product, {
  through: ProductAttribute,
  foreignKey: "attributeId",
});

Product.belongsToMany(AttributeValue, {
  through: ProductAttributeValue,
  foreignKey: "productId",
});

AttributeValue.belongsToMany(Product, {
  through: ProductAttributeValue,
  foreignKey: "attributeValueId",
});



sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database is connected');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Routes
app.get('/', async (req, res) => {
  res.send('EXPRESS IS RUNNING');
});

