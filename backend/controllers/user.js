

const getUserDetails = (req, res) => {
  try {
    res.status(200).json("Lelo mere details");
  } catch (err) {
    res.status(500).json({message: err.message ?? "Server Error"});
  }
};

module.exports = {getUserDetails};
