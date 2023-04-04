const express = require("express");
const app = express();
const cors = require("cors");
const { Mongoose } = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// schema design
const productSchema = Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product"],
    trim: true,
    unique: true,
    minLength: [3, "Name must be at least 3 characters"]
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price cannot be negative"]
  },
  unit: {
    type: String,
    required: true,
    enum: {
      value: ["kg", "liter", "pcs"],
      message: "unit value can't be {VALUE}, must be kg/liter/pcs"
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "quantity can't be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  },
  status: {
    type: String,
    required: true,
    enum: {
      value: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE}"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: true
})

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
