const { model, Schema } = require('mongoose');

const resume = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'users',
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: 'public',
    },
    projects: {
      type: Array,
      default: [],
    },
    specs: {
      type: Array,
      default: [],
    },
  },
  {
    collection: 'resumes',
    timestamps: true,
  }
);

module.exports = model('resume', resume);
