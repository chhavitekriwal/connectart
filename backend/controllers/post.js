const uploadPost = (req,res) =>{ 
    res.json("Kardiya upload");
}

const voteOnPost = (req,res) => {
    const vote = req.params.vote;

    if(vote == 'upvote') res.json('Upvote kardiya');
    else if(vote == 'downvote') res.json('Nahi aaya pasand, downvote for ya');
}

const reportPost = (req,res) => {
    const postId = req.params.id;
    res.json(id + "reported");
}

module.exports = {
    uploadPost,
    voteOnPost,
    reportPost
}