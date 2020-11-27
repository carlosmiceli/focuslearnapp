import http from "../http-common";

class CourseService {
  getAll() {
    return http.get("/courses/");
  }

  getAllByUser(userId) {
    return http.get(`/courses/${userId}`);
  }

  get(id) {
    return http.get(`/courses/${id}`);
  }

  create(data) {
    return http.post("/courses/", data);
  }

  update(id, data) {
    return http.put(`/courses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/courses/${id}`);
  }

  deleteAllByUser(userId) {
    return http.delete(`/courses/${userId}`);
  }
}

export default new CourseService();
