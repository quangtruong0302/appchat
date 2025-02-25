module.exports.register = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("messageError", "Vui lòng nhập họ và tên");
    return res.redirect("back");
  }
  if (!req.body.email) {
    req.flash("messageError", "Vui lòng nhập email");
    return res.redirect("back");
  }
  if (!req.body.password) {
    req.flash("messageError", "Vui lòng nhập mật khẩu");
    return res.redirect("back");
  }
  if (!req.body["confirm-password"]) {
    req.flash("messageError", "Vui lòng nhập lại mật khẩu");
    return res.redirect("back");
  }
  next();
};
