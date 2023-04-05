import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api/question`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":"append,delete,entries,foreach,get,has,keys,set,values,Authorization",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    userid: `${localStorage.getItem("userID")}`,
  },
});

export class apiHandler {
  async getQuestion(questionID) {
    try {
      let response = await api.get(`http://localhost:5000/api/question/get/${questionID}`);
      return response;
    } catch (err) {
      return err.response;
    }
  }

  async getExamQuestions(examID) {
    try {
      let response = await api.get(`http://localhost:5000/api/exam/get-questions/${examID}`);
      return response;
    } catch (err) {
      return err.response;
    }
  }


  async getUserHistory() {
    try {
        let response = await api.get(
          "http://localhost:5000/api/user/get-history",
);
        return response;
      } catch (err) {
        return err.response;
      }
  }
}
