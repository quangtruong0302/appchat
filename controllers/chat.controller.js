const Chat = require("../models/chat.model");
const User = require("../models/user.model");

module.exports.chat = async (req, res) => {
  IO.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGES", async (message) => {
      const chat = new Chat({
        user_id: res.locals.user.id,
        content: message,
      });
      await chat.save();
      IO.emit("SERVER_RETURN_MESSAGE", {
        userID: res.locals.user.id,
        fullName: res.locals.user.fullName,
        message: message,
      });
    });
  });

  // Lấy data từ database
  const chats = await Chat.find({
    deleted: false,
  });
  for (const chat of chats) {
    const userID = chat.user_id;
    const user = await User.findOne({
      _id: userID,
    }).select("fullName");
    chat.inforUser = user.fullName;
  }
  res.render("pages/chat/chat.pug", {
    pageTitle: "Chat",
    chats: chats,
  });
};
