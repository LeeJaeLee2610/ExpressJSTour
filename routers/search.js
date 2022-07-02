const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");

const tmp = {
  students: [],
  teachers: [],
};

router.get("/getAll", (req, res) => {
  Student.find({}, function (err, students) {
    for (let i = 0; i < students.length; i++) {
      tmp.students.push(students[i]);
    }
  });
  Teacher.find({}, function (err, teachers) {
    for (let i = 0; i < teachers.length; i++) {
      tmp.teachers.push(teachers[i]);
    }
  });
  console.log(tmp);
  res.send(tmp);
  //   const data = {
  //     students: [
  //     ],
  //   };
  //   res.send(JSON.stringify(data));
  //   const tmp = {
  //     students: [
  //       {
  //         id: 1,
  //         name: "Em Cuong",
  //       },
  //       {
  //         id: 2,
  //         name: "Duc Bui",
  //       },
  //     ],
  //     teachers: [
  //       {
  //         id: 1,
  //         name: "Manh Son",
  //       },
  //       {
  //         id: 2,
  //         name: "Manh Hung",
  //       },
  //     ],
  //   };
  //   res.send(JSON.stringify(tmp));
});

module.exports = router;
