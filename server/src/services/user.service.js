const User = require('../models/user.model');

module.exports = {
  findUserById: async ({ userId }) => {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateUser: async ({ userId, update }) => {
    try {
      return await User.findByIdAndUpdate(userId, update);
    } catch (error) {
      throw new Error(error);
    }
  },
  findUserByEmailOrName: async ({ email, name }) => {
    try {
      return await User.findOne({ $or: [{ email: email }, { name: name }] });
    } catch (error) {
      throw new Error(error);
    }
  },
  createUser: async ({ name, email, password }) => {
    try {
      return await User.create({
        name,
        email,
        password,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
