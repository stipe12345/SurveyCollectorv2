const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

module.exports = User = mongoose.model("user", userSchema);
