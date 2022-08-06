const { findVotesOfResume, createVote, updateVote, deleteVote } = require('../services/vote.service');

module.exports = {
  findVotesOfResume: async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      if (!resumeId) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Request in params not enough data' });
      }
      return res.status(200).json(await findVotesOfResume({ resumeId }));
    } catch (error) {
      next(error);
    }
  },
  createVote: async (req, res, next) => {
    try {
      const { icon } = req.body;
      const { resumeId } = req.params;
      if (!resumeId || !icon) {
        return res
          .status(400)
          .json({ name: 'ClientError', code: 400, message: 'Request in body or params not enough data' });
      }
      return res.status(201).json(await createVote({ userId: req.auth, resumeId, icon }));
    } catch (error) {
      next(error);
    }
  },
  updateVote: async (req, res, next) => {
    try {
      const { update } = req.params;
      const { voteId } = req.body;
      if (!voteId || !update) {
        return res
          .status(400)
          .json({ name: 'ClientError', code: 400, message: 'Request in body or params not enough data' });
      }
      return res.status(200).json(await updateVote({ userId: req.auth, voteId, update }));
    } catch (error) {
      next(error);
    }
  },
  deleteVote: async (req, res, next) => {
    try {
      const { voteId } = req.params;
      if (!voteId) {
        return res.status(400).json({ name: 'ClientError', code: 400, message: 'Request in params not enough data' });
      }
      return res.status(200).json({ userId: req.auth, voteId });
    } catch (error) {
      next(error);
    }
  },
};
