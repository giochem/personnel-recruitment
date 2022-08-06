const { model, Schema } = require('mongoose');

const discuss = new Schema(
  {
    resumeId: {
      type: Schema.ObjectId,
    },
    name: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    collection: 'discuss',
    timestamps: true,
  }
);

module.exports = model('discuss', discuss);
