const mongoose = require('mongoose');

const user = new mongoose.Schema({
    user_id: String,
    posts: [{type:String}]
});

module.exports = mongoose.model('User',user);