const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const sequelize = require("./_db");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const ProductAttributes = require("./models/ProductAttributes");
const Attribute = require("./models/Attribute");
const AttributeValue = require("./models/AttributeValue");

// Middleware
app.use(cors());
app.use(express.json());

Attribute.belongsToMany(Product, {
  through: ProductAttributes,
  foreignKey: "attributeId",
});

Attribute.hasMany(AttributeValue, {
  foreignKey: "attributeId",
});

AttributeValue.belongsTo(Attribute, {
  foreignKey: "attributeId",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});



Product.belongsToMany(Attribute, {
  through: ProductAttributes,
  foreignKey: "productId",
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("database is connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// routes
app.get("/", async (req, res) => {
  res.send("EXPRESS IS RUNNING ");
});

app.use("/user", require("./routes/authRoute"));
app.use("/api", require("./routes/categoryRoute"));
