const express = require("express");
const router = express.Router();

const chatRoute = require("./chat.route");
const userRoute = require("./user.route");

const middleware = require("../middlewares/auth.middleware");

const PATH = `/appchat`;
module.exports = (app) => {
  app.use(`${PATH}/chat`, middleware.auth, chatRoute);
  app.use(`${PATH}/user`, userRoute);
};
