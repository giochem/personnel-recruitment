const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = {
  // Generate JWT
  generateToken: ({ data, name, expiresIn = '36d' }) => {
    try {
      return jwt.sign({ data }, name, {
        expiresIn,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  generateHashed: async (password, salt) => {
    try {
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(error);
    }
  },
  hashCompare: async ({ password, hash }) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw error(error);
    }
  },
};
