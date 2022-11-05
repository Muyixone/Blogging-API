const userModel = require('../models/user.model');

exports.createUser = async (user) => {
  return await userModel.create(user);
};

exports.getUserByID = async (id) => {
  return await userModel.getUserByID(id);
};
