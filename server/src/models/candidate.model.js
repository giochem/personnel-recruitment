const { model, Schema } = require('mongoose');

const candidate = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'users',
    },
    applicationId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'applications',
    },
    resumeId: {
      type: Schema.ObjectId,
      ref: 'resumes',
    },
    name: String,
  },
  {
    collection: 'candidates',
    timestamps: true,
  }
);

module.exports = model('candidate', candidate);
