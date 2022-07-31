const mongoose = require('mongoose');

const user = new mongoose.Schema({
    user_id: String,
    userEmail: String,
    posts: [{type:String}]
});

module.exports = mongoose.model('User',user);