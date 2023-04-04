const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");
const dbConnect = require("./utils/dbConnect");

// database connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection established`.blue.bold);
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.green.bold);
});

