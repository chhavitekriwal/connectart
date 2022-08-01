const Post = require('../models/post');

const getUserDetails = async (req, res) => {
  try {
    const userID = req.params.userId;
    const posts = await Post.find({postUserID: userID});
    let maxUpvotes=0,totalUpvotes=0;
    let bestPost;
    posts.forEach(post => {
      if(post.upvoteCount>maxUpvotes) {
          bestPost = {
          postLink: `https://i.imgur.com/${post.postID}`,
          upvoteCount: post.upvoteCount
        };
        maxUpvotes = post.upvoteCount;
      }
      totalUpvotes+= post.upvoteCount;
    })
    if(!bestPost) throw new Error('No posts!');
    res.status(200).json({bestPost,totalUpvotes});
  } catch (err) {
    res.status(500).json({message: err.message ?? "Server Error"});
  }
};

module.exports = {getUserDetails};
