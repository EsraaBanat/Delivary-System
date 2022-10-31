require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/index");

///////////////////////////
// testing release 1

const app = express();
app.use(express.json());
app.use(cors());

//////////////////////////////////////////////////////

const resturantRoute = require("./rourter/route/resturantRoutes");

app.use("/", resturantRoute);

///////////////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    console.log(`app listening on http://localhost:${PORT}`);
    await sequelize
      .sync({
        // force: true,
        // alter: true,
      })
      .then(() => {
        console.log("Database connected successfully");
      });
  } catch (error) {
    console.log(error);
  }
});
