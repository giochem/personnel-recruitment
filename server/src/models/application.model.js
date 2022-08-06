const { model, Schema } = require('mongoose');

const application = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'users',
    },
    title: {
      type: String,
      require: true,
    },
    computer: {
      type: String,
      require: true,
    },
    address: String,
    wage: String,
    education: String,
    position: String,
    typeJob: String,
    workingForm: String,
    quantity: Number,
    jobDescription: String,
    jobRequest: String,
    candidateBenefit: String,
    skills: {
      type: Array,
      default: [],
    },
  },
  {
    collection: 'applications',
    timestamps: true,
  }
);

module.exports = model('application', application);
