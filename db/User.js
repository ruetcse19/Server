const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String },
  department: { type: String},
  introduction: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
