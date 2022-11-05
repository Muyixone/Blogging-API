const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//Defining the like properties
const requiredStr = {
  type: String,
  required: true,
};

const userSchema = new Schema({
  first_name: requiredStr,
  last_name: requiredStr,
  email: {
    type: String,
    reuired: true,
    unique: true,
  },
  password: requiredStr,
});

//To hash the user information before storing to the database
userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

//To ensure the user trying to login has the correct credentials
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = mongoose.model('user', userSchema);
