const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { isEmail } = require('validator');

const UserSchema = new Schema({
    username:  {
      type: String,
      required: [true, "Title is required"]
    },
    email:  {
      type: String,
      required: [true, "Order is required"],
      lowercase: true,
      unique: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, 'Minimum password length must be 8 characters']
    },
    createdOn: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    }
  });

const User = model('User', UserSchema);
module.exports =  User;