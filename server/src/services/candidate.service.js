const Candidate = require('../models/candidate.model');
const { findUserById } = require('../services/user.service');
module.exports = {
  createCandidate: async ({ applicationId, userId, resumeId, name }) => {
    try {
      return await Candidate.create({
        userId,
        applicationId,
        resumeId,
        name,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  findCandidatesOfApplication: async ({ applicationId }) => {
    try {
      return await Candidate.find({ applicationId });
    } catch (error) {
      throw new Error(error);
    }
  },
};
