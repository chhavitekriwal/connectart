const express = require('express');
const router = express.Router();
const {uploadPost, voteOnPost, reportPost } = require("../controllers/post");
const { verifySession } = require('supertokens-node/recipe/session/framework/express');
const multer = require("multer");
const upload = multer();

router.post('/upload',verifySession(), upload.single('image'),uploadPost);
router.put('/vote/:id',verifySession(), voteOnPost);
router.put('/report/:id',verifySession(), reportPost);

module.exports = router;