const Application = require('../models/application.model');

module.exports = {
  createApplication: async ({ userId, title, computer, specs }) => {
    try {
      return await Application.create({
        userId,
        title,
        computer,
        ...specs,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  findApplicationsPublic: async () => {
    try {
      return await Application.find({ status: 'public' });
    } catch (error) {
      throw new Error(error);
    }
  },
  findApplicationsOfUser: async ({ userId }) => {
    try {
      return await Application.find({ userId });
    } catch (error) {
      throw new Error(error);
    }
  },
  findApplicationById: async ({ applicationId }) => {
    try {
      return await Application.findById(applicationId);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteApplication: async ({ userId, applicationId }) => {
    try {
      return await Application.findOneAndDelete({ userId, applicationId });
    } catch (error) {
      throw new Error(error);
    }
  },
};
