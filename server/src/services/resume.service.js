const Resume = require('../models/resume.model');

module.exports = {
  findResumesPublic: async () => {
    try {
      return await Resume.find({ status: 'public' });
    } catch (error) {
      throw new Error(error);
    }
  },
  findResumeById: async ({ resumeId }) => {
    try {
      return await Resume.findById(resumeId);
    } catch (error) {
      throw new Error(error);
    }
  },
  findResumesByUserId: async ({ userId }) => {
    try {
      return await Resume.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  },
  createResume: async ({ userId, name, description, status, projects }) => {
    try {
      return await Resume.create({
        userId,
        name,
        description,
        status,
        projects,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  updateResumeById: async ({ resumeId, update }) => {
    try {
      return await Resume.findByIdAndUpdate(resumeId, update);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteResumeById: async ({ resumeId }) => {
    try {
      return await Resume.findByIdAndDelete(resumeId);
    } catch (error) {
      throw new Error(error);
    }
  },
};
