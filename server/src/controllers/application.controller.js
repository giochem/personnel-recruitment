const {
  findApplicationsPublic,
  findApplicationsOfUser,
  findApplicationById,
  createApplication,
  deleteApplication,
} = require('../services/application.service');

module.exports = {
  findApplicationsPublic: async (_, res, next) => {
    try {
      return res.status(200).json(await findApplicationsPublic());
    } catch (error) {
      next(error);
    }
  },
  findApplicationById: async (req, res, next) => {
    try {
      const { applicationId } = req.params;
      if (!applicationId) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Request in params not enough data' });
      }
      return res.status(200).json(await findApplicationById({ applicationId }));
    } catch (error) {
      next(error);
    }
  },
  findApplicationsOfUser: async (req, res, next) => {
    try {
      return res.status(200).json(await findApplicationsOfUser({ userId: req.auth }));
    } catch (error) {
      next(error);
    }
  },
  createApplication: async (req, res, next) => {
    try {
      const { title, computer, ...specs } = req.body;
      if (!title || !computer) {
        return res.status(400).json({
          name: 'ClientError',
          code: 400,
          message: 'Request in body not enough data',
        });
      }
      return res.status(200).json(await createApplication({ userId: req.auth, title, computer, specs }));
    } catch (error) {
      next(error);
    }
  },
  deleteApplication: async (req, res, next) => {
    try {
      const { applicationId } = req.params;
      if (!applicationId) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Request in params not enough data' });
      }
      return res.status(200).json(await deleteApplication({ userId: req.auth, applicationId }));
    } catch (error) {
      next(error);
    }
  },
};
