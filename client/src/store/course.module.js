firebase.coursesCollection.orderBy("createdOn", "desc").onSnapshot(snapshot => {
  let coursesArray = [];

  snapshot.forEach(doc => {
    let course = doc.data();
    course.id = doc.id;

    coursesArray.push(course);
  });

  store.commit("setCourses", coursesArray);
});
