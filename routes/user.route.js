const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const validateRegister = require("../validates/register.validate");
const validateLogin = require("../validates/login.validate");

router.get("/register", controller.register);
router.post("/register", validateRegister.register, controller.registerPOST);
router.get("/login", controller.login);
router.post("/login", validateLogin.login, controller.loginPOST);

module.exports = router;
