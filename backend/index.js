const express = require('express');
const cors = require('cors');
const sequelize = require('./_db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Step 1: Manually import models
const Attribute = require('./models/Attribute');
const AttributeValue = require('./models/AttributeValue');
const Category = require('./models/category');

// Step 2: Define your models array
const models = [Attribute, AttributeValue,Category];

// Step 3: Set associations (if any) for each model
models.forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);  
  }
});


sequelize
  .sync({ force: true })
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

// app.use('/user', require('./routes/authRoute'));
// app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/attributeRoute'));
app.use('/api', require('./routes/adminRoute'));


// app.use('/api', require('./routes/attributeValueRoute'));
// app.use('/api', require('./routes/productRoute')); // Ensure this line is present
