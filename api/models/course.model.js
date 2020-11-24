module.exports = mongoose => {
  const Course = mongoose.model(
    "course",
    mongoose.Schema(
      {
        title: String,
        url: String,
        category: {
          enum: ["Video", "Text"],
          type: String
        }
      },
      { timestamps: true }
    )
  );
  return Course;
};
