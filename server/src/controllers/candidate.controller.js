const { createCandidate, findCandidatesOfApplication } = require('../services/candidate.service');
module.exports = {
  findCandidatesOfApplication: async (req, res, next) => {
    try {
      const { applicationId } = req.params;

      if (!applicationId) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Request in params not enough data' });
      }
      return res.status(200).json(await findCandidatesOfApplication({ applicationId }));
    } catch (error) {
      next(error);
    }
  },
  createCandidate: async (req, res, next) => {
    try {
      const { applicationId, resumeId, name } = req.body;
      if (!applicationId || !resumeId || !name) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Request in body not enough data' });
      }
      return res.status(200).json(await createCandidate({ userId: req.auth, applicationId, resumeId, name }));
    } catch (error) {
      next(error);
    }
  },
};
