const md5 = require("md5");
const genarateToken = require("../helpers/generateToken.helper");
const User = require("../models/user.model");

module.exports.register = (req, res) => {
  res.render("pages/user/register.pug", {
    pageTitle: "Đăng kí tài khoản",
  });
};

module.exports.registerPOST = async (req, res) => {
  const { fullName, email, password } = req.body;
  const confirmPassword = req.body["confirm-password"];
  const existEmail = await User.findOne({ email: email });
  if (existEmail) {
    req.flash("messageError", "Địa chỉ email đã tồn tại");
    return res.redirect("back");
  } else {
    if (password != confirmPassword) {
      req.flash("messageError", "Mật khẩu không khớp");
      return res.redirect("back");
    } else {
      const newPassword = md5(password);
      const tokenUser = genarateToken();
      try {
        const user = new User({
          fullName,
          email,
          password: newPassword,
          tokenUser,
        });
        await user.save();
        req.flash("messageSuccess", "Đăng kí tài khoản thành công");
        return res.redirect("/appchat/user/login");
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports.login = (req, res) => {
  if (req.session.tokenUser) {
    res.render("pages/chat/chat.pug", {
      pageTitle: "App chat",
    });
  } else {
    res.render("pages/user/login.pug", {
      pageTitle: "Đăng nhập",
    });
  }
};

module.exports.loginPOST = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const newPassword = md5(password);
    if (newPassword === user.password) {
      req.flash("messageSuccess", "Đăng nhập thành công");
      req.session.tokenUser = user.tokenUser;
      return res.redirect("/appchat/chat");
    } else {
      req.flash("messageError", "Mật khẩu không đúng");
      return res.redirect("back");
    }
  } else {
    req.flash("messageError", "Tài khoản không tồn tại");
    return res.redirect("back");
  }
};
