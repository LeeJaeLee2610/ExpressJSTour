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

// app.get("/demoUpload", (req, res) => {
//   res.send(JSON.stringify(req.file));
// });

// app.post("/multiple", upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple files upload success");
// });

router(app);

app.listen(3030);
