import API from "@/axios/_api";

let apis = {
    getStudents: "https://www.easy-mock.com/mock/5b574c739a5ff5320380791b/tuniu/citiesInfo",
};

let comment = new API(apis);

comment.getStudents = params => {
  return comment.fetch(comment.apis.getStudents, params, "post", {
    api: "api56",
    auth: false
  });
};
export default comment;
