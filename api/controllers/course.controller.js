const db = require("../models");
const Course = db.course;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req.body.title);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Course
  const course = new Course({
    title: req.body.title,
    url: req.body.url,
    category: req.body.category
  });

  // Save Tutorial in the database
  course
    .save(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Course."
      });
    });
};

// Retrieve all Courses from a single user from the database.
exports.findAll = (req, res) => {
  //IMPLEMENT FIND ALL BY USER ID
  //     const title = req.query.title;
  //   let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Course.find(
    //       {
    //     where: {
    //       userId: req.params.userId
    //     },
    //     order: [["createdAt", "DESC"]]
    //   }
    condition
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Course with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Course with id=" + id });
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
        });
      } else {
        res.send({
          message: "Course was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};
