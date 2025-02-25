const User = require("../models/user.model");

module.exports.auth = async (req, res, next) => {
  if (!req.session.tokenUser) {
    return res.redirect("/appchat/user/login");
  } else {
    const user = await User.findOne({
      tokenUser: req.session.tokenUser,
    }).select("-password -tokenUser");
    if (!user) {
      return res.redirect("/appchat/user/login");
    } else {
      res.locals.user = user;
      next();
    }
  }
};
