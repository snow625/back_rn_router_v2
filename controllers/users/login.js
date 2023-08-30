const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

module.exports = login;
