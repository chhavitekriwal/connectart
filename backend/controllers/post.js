const axios = require('axios');
const FormData = require('form-data');
const data = new FormData();
const Post = require('../models/post');

const uploadPost = async (req,res) =>{ 
    try {   
        const image = req.file.buffer;
        if(!image) throw new Error('Image not provided');
        data.append('image',image);
        const headers = {
            headers: { 
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
                ...data.getHeaders()
            }
        }
        const userID = req.session.getUserId();
        const uploadData = await axios.post('https://api.imgur.com/3/image',data,headers);
        const post = new Post({
            postID: uploadData.data.data.id,
            postUserID: userID,
            upvoteCount: 0,
            downvoteCount: 0,
            reportCount: 0
        })
        await post.save();
        const response = {'Status':'Success', 'Details':'Saved in database'};
        res.status(200).json(response);

    }
     catch(err) {
        const response = {'Status':'Failure', 'Details':err.message};
        res.status(500).json(response);
    }
}

const voteOnPost = async (req,res) => {
    try{
        const postID = req.params.id;
        const type = req.query.type;

        const result = await Post.findOne({postID: postID});
        if(result)
        {
            if(type == 'upvote') ++result.upvoteCount;
            else if(type == 'downvote') ++result.downvoteCount;
            await result.save();
            const response = {
                'Status':'Success', 
                'Vote type': type, 
                'upvotes':result.upvoteCount, 
                'downvotes':result.downvoteCount
            };
            res.status(200).json(response);
        }
        else {
            res.status(404).json({"Status":"Failure" ,"Error": 'Post not found'});
        }
    } catch (err) {
        const response = {"Status":"Failure" ,"Error": err.message};
        res.status(500).send(response);
    }
}

const reportPost = async (req,res) => {
    try {
        const postID = req.params.id;
        const post = await Post.findOne({postID: postID});
        if(post)
        {
            ++post.reportCount;
            await post.save();
            const response = {'Status':'Success', 'Details':'Reported post'};
            res.status(200).json(response);
        } else {
            const response = {'Status':'Failure', 'Details':'Post not Found'};
            res.status(404).json(response);
        }
    } catch(err) {
        const response = {'Status':'Failure', 'Details':err.message};
        res.status(500).json(response);
    }
}

module.exports = {
    uploadPost,
    voteOnPost,
    reportPost,
}