const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routers");
const session = require("express-session");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/demo");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60 * 60 * 24 },
  })
);

router(app);

app.post("/upload-profile-pic", (req, res) => {});

// app.use(session({ secret: "Shh, its a secret!" }));

// app.get("/test", function (req, res) {
//   if (req.session.page_views) {
//     req.session.page_views++;
//     res.send("You visited this page " + req.session.page_views + " times");
//   } else {
//     req.session.page_views = 1;
//     res.send("Welcome to this page for the first time!");
//   }
// });

app.listen(3030);
