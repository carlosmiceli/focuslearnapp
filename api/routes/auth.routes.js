module.exports = function (app) {
  const controller = require("../controllers/auth.controller");
  const db = require("../models");
  const User = db.user;
  const verifySignUp = {};

  verifySignUp.checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  };

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
