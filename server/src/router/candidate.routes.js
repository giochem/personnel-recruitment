const express = require('express');
const routes = express();
const { createCandidate, findCandidatesOfApplication } = require('../controllers/candidate.controller');

const { userAuth } = require('../middleware/auth.middleware');

routes.route('/me').post(userAuth, createCandidate);

routes.route('/me/:applicationId').get(findCandidatesOfApplication);

module.exports = routes;
