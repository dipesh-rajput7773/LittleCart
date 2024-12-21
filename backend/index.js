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


Product.belongsToMany(Attribute, {
  through: ProductAttribute,  // Junction table
  foreignKey: "productId",
});


Attribute.belongsToMany(Product, {
  through: ProductAttribute,
  foreignKey: "attributeId",
});


Product.belongsToMany(AttributeValue, {
  through: ProductAttributeValue,  // Junction table between Product and AttributeValue
  foreignKey: "productId",
});


Attribute.hasMany(AttributeValue, {
  foreignKey: "attributeId",
});

AttributeValue.belongsTo(Attribute, {
  foreignKey: "attributeId",
});

AttributeValue.belongsToMany(Product, {
  through: ProductAttributeValue,
  foreignKey: "attributeValueId",
});

const fs = require('fs');
const path = require('path');


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

sequelize
  .sync({ alter: true })
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', require('./routes/authRoute'));
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/attributeRoute'));
app.use('/api', require('./routes/attributeValueRoute'));
app.use('/api', require('./routes/productRoute'));
