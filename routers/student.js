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
  try {
    // const { name, gpa, id } = req.body;
    // req.session.Stu = {
    //   name: name,
    //   gpa: gpa,
    //   id: id,
    // };
    // console.log(req.session.Stu);
    var stu = new Student(req.body);
    await stu.save();
    res.send(stu);
  } catch (error) {
    console.log(error);
  }
  // console.log(req.body);
});

router.put("/putStudent/:_id", async (req, res) => {
  try {
    const stu = await Student.findOne({ _id: req.params._id });
    stu.name = req.body.name;
    stu.gpa = req.body.gpa;
    stu.id = req.body.id;
    await stu.save();
    res.send(stu);
  } catch (error) {
    console.log(error);
  }
  console.log(req.body);
});

// router.get("/set", (req, res) => {
//   req.session.student = {
//     name: "Duc Cuong",
//   };
//   res.send("Ok");
// });

router.get("/test", (req, res) => {
  Student.find({})
    .lean()
    .then((students) => {
      req.session.student = students;
      res.send(req.session);
    });
});

router.delete("/deleteStudent/:_id", async (req, res) => {
  await Student.deleteOne({ _id: req.params._id });
  Student.find({})
    .lean()
    .then((students) => {
      res.json(students);
    });
  console.log(req.params._id);
});

router.get("/getStudentByID/:_id", async (req, res) => {
  const stu = await Student.findOne({ _id: req.params._id });
  res.send(stu);
});

module.exports = router;
