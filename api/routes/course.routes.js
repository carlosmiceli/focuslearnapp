module.exports = app => {
  const courses = require("../controllers/course.controller.js");

  let router = require("express").Router();

  // Create a new Course
  router.post("/", courses.create);

  // Retrieve all Courses
  router.get("/", courses.findAll);

  // Retrieve a single Course with id
  router.get("/:id", courses.findOne);

  // Delete a Course with id
  router.delete("/:id", courses.delete);

  app.use("/api/courses", router);
};
