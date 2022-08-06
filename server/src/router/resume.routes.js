const express = require('express');
const routes = express();
const {
  findResumesPublic,
  findResumesById,
  createResume,
  findResumesByUserId,
  updateResumeById,
  deleteResumeById,
} = require('../controllers/resume.controller');

const { userAuth } = require('../middleware/auth.middleware');

routes.get('', findResumesPublic);

routes.route('/me').post(userAuth, createResume).get(userAuth, findResumesByUserId);

routes.route('/me/:resumeId').put(userAuth, updateResumeById).delete(userAuth, deleteResumeById);

routes.get('/:resumeId', findResumesById);

module.exports = routes;
