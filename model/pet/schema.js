const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String }
});


module.exports = mongoose.model('Pet', petSchema);
