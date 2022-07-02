const express = require("express");
const router = express.Router();
const Teacher = require("../model/Teacher");

router.get("/getTeachers", (req, res) => {
  Teacher.find({})
    .lean()
    .then((teachers) => {
      res.json(teachers);
    });
});

module.exports = router;
