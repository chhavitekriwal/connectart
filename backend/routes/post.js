const express = require('express');
const router = express.Router();
const {uploadPost, voteOnPost, reportPost } = require("../controllers/post");
const multer = require("multer");
const upload = multer();

router.post('/upload',upload.single('image'),uploadPost);
router.put('/vote/:id', voteOnPost);
router.put('/report/:id', reportPost);

module.exports = router;