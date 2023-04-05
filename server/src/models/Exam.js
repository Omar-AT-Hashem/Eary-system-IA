import conn from "../config/database.js";

export class Exam {
  index = async () => {
    try {
      const sql = "SELECT * FROM exams";
      const result = await conn.awaitQuery(sql);
      return result;
    } catch (err) {
      throw err;
    }
  };

  getExam = async (id) => {
    try {
      const sql = "SELECT * FROM exams WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  createExam = async (userID) => {
    try {
      const sql = "INSERT INTO exams (userID) VALUES (?)";
      const values = [userID];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteExam = async (id) => {
    try {
      const sql = "DELETE FROM exams WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  updateExam = async (name, id) => {
    try {
      const sql = "UPDATE exams SET name = ?, WHERE id = ?";
      const values = [name, id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  createExamQuestions = async (examID, questionIDs) => {
    try {
      const sql = "INSERT INTO examquestions (questionID, examID) VALUES (?,?)";
      questionIDs.forEach(async (questionID) => {
        const values = [questionID, examID];
        await conn.awaitQuery(sql, values);
      });
    } catch (err) {
      throw err;
    }
  };

  getQuestions = async (examID) => {
    try {
      const sql = "SELECT * FROM examquestions WHERE examID = ?";
      const values = [examID];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };
}
