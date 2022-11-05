const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Your First name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Your last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Your email address is required'],
      unique: [true, 'This email already exists'],
      lowercase: true,
      validate: [validator.isEmail, 'Provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    articles: [
      {
        type: Schema.ObjectId,
        ref: 'BLog',
      },
    ],
  },
  { timestamps: true }
);

/// USING JWT

//has user password before saving into database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hashSync(this.password, saltRounds);
  next();
});

//To ensure the user trying to login has the correct credentials
userSchema.methods.isValidPassword = async function (password, userPassword) {
  const compare = await bcrypt.compare(password, userPassword);

  return compare;
};

module.exports = mongoose.model('user', userSchema);
