const express = require("express");
const userRegisterMiddleware = require("./user/user.register.middleware");

const registerMiddleware = express();

registerMiddleware.post(
  "/user",
  userRegisterMiddleware
);

module.exports = registerMiddleware;
