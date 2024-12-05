const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const  sequelize  = require("./_db");
const  User  = require("./models/user");


// Middleware
app.use(cors());
app.use(express.json());

console.log('testing')


sequelize
  .sync({ force: false })
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

  app.use("/user",require('./routes/authRoute'))



