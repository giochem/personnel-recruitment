const { model, Schema } = require('mongoose');

const vote = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      require: true,
      ref: 'users',
    },
    resumeId: {
      type: Schema.ObjectId,
      require: true,
      ref: 'resumes',
    },
    icon: {
      type: String,
      default: 'upvote',
    },
  },
  {
    collection: 'votes',
    timestamps: true,
  }
);

module.exports = model('vote', vote);
