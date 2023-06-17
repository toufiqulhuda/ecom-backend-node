const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    name:  {
      type: String,
      required: [true, "Title is required"]
    },
    desc:  {
        type: String
      },
    cover:  {
        type: String,
        required: [true, "Cover is required"]
      },
    price:  {
        type: String,
        required: [true, "Title is required"]
      },
    discount:  {
      type: String
    },
    cateName:  {
      type: String,
      required: [true, "cateName is required"]
    },
    brand:  {
      type: String,
      required: [true, "Brand name is required"]
    },
    section: {
      type: String
    },
    createdOn: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    }
  });

const Product = model('Product', ProductSchema);
module.exports =  Product;
