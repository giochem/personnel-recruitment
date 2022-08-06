const { model, Schema } = require('mongoose');

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // employer user admin
      default: 'user',
    },
    specs: {
      type: Array,
      default: [],
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

module.exports = model('user', user);
