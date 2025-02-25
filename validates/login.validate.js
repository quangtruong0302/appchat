module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    req.flash("messageError", "Vui lòng nhập email");
    return res.redirect("back");
  }
  if (!req.body.password) {
    req.flash("messageError", "Vui lòng nhập mật khẩu");
    return res.redirect("back");
  }
  next();
};
