const studentRouter = require("./student.js");
const teacherRouter = require("./teacher.js");
const searchRouter = require("./search.js");

function router(app) {
  app.use("/students", studentRouter);
  app.use("/teachers", teacherRouter);
  app.use("/search", searchRouter);
}

module.exports = router;
