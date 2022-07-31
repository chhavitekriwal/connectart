const express = require('express');
const router = express.Router();
const {getUserDetails} = require('../controllers/user');

router.get('/:userId',getUserDetails);

module.exports = router;