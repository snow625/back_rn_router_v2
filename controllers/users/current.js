const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models/users");

const current = async (req, res, next) => {
  const { user } = req;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email: user.email } });
};

module.exports = current;
