const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routers");
const session = require("express-session");
// const path = require("path");
const multer = require("multer");
const helpers = require("./helpers.js");
var appRoot = require("app-root-path");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/demo");

app.use(
  session({
    secret: "keyboard cat",
    store: new RedisStore({ client: redisClient }),
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60 * 60 * 24 },
  })
);

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.post("/setSession", (req, res) => {
  req.session.tmp = req.body;
  res.send(req.session);
});

app.get("/getSession", (req, res) => {
  res.send(req.session);
});

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRoot + "/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: helpers.imageFilter,
});

// upload.single("image")

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send(req.body);
});

app.put("/update", upload.single("image"), (req, res) => {});

// app.get("/demoUpload", (req, res) => {
//   res.send(JSON.stringify(req.file));
// });

// app.post("/multiple", upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple files upload success");
// });

router(app);

app.listen(3031);
