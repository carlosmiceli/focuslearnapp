module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema({
      email: String,
      password: String,
      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course"
        }
      ]
    })
  );
  return User;
};
