const mongoose = require('mongoose');

const post = new mongoose.Schema({
    postID: String,
    postUserID: String,
    upvoteCount: Number,
    downvoteCount: Number,
    reportCount: Number,
},{timestamps:true})

module.exports = mongoose.model('Post',post);