const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/user');

router.get('/user/:userId',userController.getUserDetails);

module.exports = router;

/**
** upload - imgur
** vote
** profile
** report
*/


/**
 * all above 
 * leaderboard
 * 
 */