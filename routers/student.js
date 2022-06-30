const express = require("express");
const router = express.Router();
const Student = require("../model/Student");

router.get("/getStudents", (req, res) => {
  Student.find({})
    .lean()
    .then((students) => {
      res.json(students);
    });
});

router.post("/postStudent", async (req, res) => {
  var stu = new Student(req.body);
  await stu.save();
});

router.put("/putStudent/:_id", async (req, res) => {
  try {
    const stu = await Student.findOne({ _id: req.params._id });
    stu.name = req.body.name;
    stu.gpa = req.body.gpa;
    stu.id = req.body.id;
    console.log(req.body);
    await stu.save();
  } catch (error) {
    res.send(error);
  }
});

router.delete("/deleteStudent/:_id", async (req, res) => {
  await Student.deleteOne({ _id: req.params._id });
  console.log(req.params._id);
  Student.find({})
    .lean()
    .then((students) => {
      res.json(students);
    });
});

router.get("/getStudentByID/:_id", async (req, res) => {
  const stu = await Student.findOne({ _id: req.params._id });
  res.send(stu);
});

module.exports = router;
