const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  if (password.length < 6) {
    throw RequestError(409, "The password must be longer than 5 characters");
  }
  // ****Create user***

  const hashPassword = await bcrypt.hash(password, 10);
  const { _id } = await User.create({ email, password: hashPassword });
  // ******

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(_id, { token });

  res.json({
    token,
    user: {
      email,
    },
  });
};

module.exports = register;
