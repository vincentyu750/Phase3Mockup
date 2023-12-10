const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure that each email is unique
  },
  password: {
    type: String,
    required: true
  }
});

const RegisterModel = mongoose.model('Register', registerSchema);

module.exports = RegisterModel;