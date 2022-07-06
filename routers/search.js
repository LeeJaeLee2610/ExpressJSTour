const express = require("express");
const router = express.Router();
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");

const tmp = {
  search: [],
};
Student.find({}, function (err, students) {
  for (let i = 0; i < students.length; i++) {
    tmp.search.push(students[i]);
  }
});
Teacher.find({}, function (err, teachers) {
  for (let i = 0; i < teachers.length; i++) {
    tmp.search.push(teachers[i]);
  }
});

router.get("/", (req, res) => {
  var result = {
    search: [],
  };
  console.log(req.query.name);
  tmp.search.forEach((item, index) => {
    if (item.name.includes(req.query.name)) {
      result.search.push(item);
    }
  });
  console.log(result);
  res.send(result);
});

module.exports = router;
