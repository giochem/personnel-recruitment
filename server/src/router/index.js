const express = require('express');
const router = express();

router.use('/users', require('./user.routes'));
router.use('/resumes', require('./resume.routes'));
router.use('/votes', require('./vote.routes'));
router.use('/applications', require('./application.routes'));
router.use('/candidates', require('./candidate.routes'));

module.exports = router;
