const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Router = require("./routes/index.route");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const Database = require("./config/database");
Database.connect();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(cookieParser("appchat"));
app.use(session({ cookie: { maxAge: 5 * 60 * 1000 } }));

app.use(flash());

global.IO = io;

Router(app);
server.listen(process.env.PORT, () => {
  console.log(`Project Appchat running on port ${process.env.PORT}`);
});
