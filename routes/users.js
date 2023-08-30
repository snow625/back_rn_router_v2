const express = require("express");

const router = express.Router();

const {
  users: { login, register, current, logOut },
} = require("../controllers");

const { controllerWrapper } = require("../decorators");

const { validateBody, authenticate } = require("../middlewares");
const {
  schemas: { registerSchema },
} = require("../models/users");

router.post("/signup", validateBody(registerSchema), controllerWrapper(register));

router.post("/login", validateBody(registerSchema), controllerWrapper(login));

router.get("/current", authenticate, controllerWrapper(current));

router.get("/logout", authenticate, controllerWrapper(logOut));

module.exports = router;
