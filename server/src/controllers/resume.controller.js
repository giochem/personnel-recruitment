const {
  findResumesPublic,
  findResumeById,
  createResume,
  findResumesByUserId,
  updateResumeById,
  deleteResumeById,
} = require('../services/resume.service');

module.exports = {
  findResumesPublic: async (_, res, next) => {
    try {
      return res.status(200).json(await findResumesPublic());
    } catch (error) {
      next(error);
    }
  },
  findResumesByUserId: async (req, res, next) => {
    try {
      const resumes = await findResumesByUserId({ userId: req.auth });
      res.status(200).json(resumes);
    } catch (error) {
      next(error);
    }
  },
  findResumesById: async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      if (!resumeId) {
        res.status(400).json({
          name: 'ClientError',
          code: 400,
          message: 'Request in params not enough data',
        });
      }
      return res.status(200).json(await findResumeById({ resumeId }));
    } catch (error) {
      next(error);
    }
  },
  createResume: async (req, res, next) => {
    try {
      const { name, description, status, projects } = req.body;

      if (!name || !description || !projects.length) {
        return res.status(200).json({ name: 'ClientError', code: 400, message: 'Request in body not enough data' });
      }
      const newResume = await createResume({ userId: req.auth, name, description, status, projects });

      return res.status(201).json(newResume);
    } catch (error) {
      next(error);
    }
  },
  updateResumeById: async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const update = req.body;
      if (!resumeId || update) {
        return res.status(400).json({
          name: 'ClientError',
          code: 400,
          message: 'Request in params not enough data',
        });
      }
      const updateResume = await updateResumeById({ resumeId, update });
      return res.status(200).json(updateResume);
    } catch (error) {
      next(error);
    }
  },
  deleteResumeById: async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      if (!resumeId) {
        return res.status(200).json({ name: 'ClientError', code: 400, message: 'Request in params not enough data' });
      }
      return res.status(200).json(await deleteResumeById({ resumeId }));
    } catch (error) {
      next(error);
    }
  },
};
