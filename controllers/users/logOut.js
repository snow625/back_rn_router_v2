
const { User } = require("../../models/users");

const logOut = async (req, res, next) => {
  const { user } = req;
  await User.findByIdAndUpdate(user._id, { token:null });

  res.json({ message:'ok' });
};

module.exports = logOut;