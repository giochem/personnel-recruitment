const express = require('express');
const routes = express();

const {
  findApplicationsPublic,
  findApplicationsOfUser,
  findApplicationById,
  createApplication,
  deleteApplication,
} = require('../controllers/application.controller');

const { userAuth } = require('../middleware/auth.middleware');

routes.route('').get(findApplicationsPublic);

routes.route('/me').get(userAuth, findApplicationsOfUser).post(userAuth, createApplication);

routes.route('/me/:applicationId').delete(userAuth, deleteApplication);

routes.route('/:applicationId').get(findApplicationById);

module.exports = routes;
