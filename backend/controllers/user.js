const getUserDetails = (req, res) => {
  try {
    console.log('User ID: ', req.params.userId);
    res.status(200).json({status: 'ok'});
  } catch (err) {
    res.status(500).json({message: err.message ?? "Server Error"});
  }
};

module.exports = {getUserDetails};
