const userModel = require('../models/user.model');

exports.createUser = async (user) => {
  return await userModel.create(user);
};

exports.login = async (email) => {
  return await userModel.findOne(email);
};

exports.authenticate = async (userId) => {
  return await userModel.findById(userId);
};
