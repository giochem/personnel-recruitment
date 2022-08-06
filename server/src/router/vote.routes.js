const express = require('express');
const routes = express();
const { findVotesOfResume, createVote, updateVote, deleteVote } = require('../controllers/vote.controller');
const { userAuth } = require('../middleware/auth.middleware');

routes.route('/vote/:voteId').put(userAuth, updateVote).delete(userAuth, deleteVote);

routes.route('/:resumeId').get(findVotesOfResume);

routes.route('/:resumeId').post(userAuth, createVote);

module.exports = routes;
