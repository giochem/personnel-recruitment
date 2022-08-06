const Vote = require('../models/vote.model');

module.exports = {
  findVotesOfResume: async ({ resumeId }) => {
    try {
      return await Vote.find({ resumeId });
    } catch (error) {
      throw new Error(error);
    }
  },
  createVote: async ({ userId, resumeId, icon }) => {
    try {
      return await Vote.create({
        userId,
        resumeId,
        icon,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  updateVote: async ({ userId, voteId, update }) => {
    try {
      return await Vote.findOneAndUpdate({ userId, voteId }, update);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteVote: async ({ userId, voteId }) => {
    try {
      return await Vote.findOneAndDelete({ userId, voteId });
    } catch (error) {
      throw new Error(error);
    }
  },
};
