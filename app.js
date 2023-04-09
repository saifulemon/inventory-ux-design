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
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE}"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  supplier: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  }, 
  categories: [{
    name: {
      type: String,
      required: true
    },
    _id: Mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true
})

// Model creation
const Product = Mongoose.model('Product', productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


// posting to database
app.post("/api/vi/product", async( req,res,next) => {
  try {
    // save or create
  const product = new Product(req.body);
  const result = await product.save();

  res.status(200).json({
    status: 'success',
    message: 'Product saved successfully',
    data: result  
  })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Product saved failed',
      error: error.message
    })
  }
})

module.exports = app;
