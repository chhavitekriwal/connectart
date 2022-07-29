const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const {uploadPost, voteOnPost, reportPost } = require("../controllers/post");

router.post('/upload',uploadPost);
router.put('/:vote', voteOnPost);
router.put('/report/:id',reportPost);
// put - vote
// report - put
//

module.exports = router;