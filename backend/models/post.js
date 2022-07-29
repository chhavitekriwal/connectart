const mongoose = require('mongoose');

const post = new mongoose.Schema({
    postID: String,
    postedBy: String,
    upvotes: Number,
    downvotes: Number,
    reportCount: Number,
},{timestamps:true})

module.exports = mongoose.model('Post',post);