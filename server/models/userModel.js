/** Mongo database schema for User collection */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String},
  lastName: { type: String},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: Number},
  email: {type: String}
});

module.exports = mongoose.model('User', userSchema);
