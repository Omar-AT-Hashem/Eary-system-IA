import conn from "../config/database.js";

export class Question {
  index = async () => {
    try {
      const sql = "SELECT * FROM questions";
      const result = await conn.awaitQuery(sql);
      return result;
    } catch (err) {
      throw err;
    }
  };

  getQuestion = async (id) => {
    try {
      const sql = "SELECT * FROM questions WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  createQuestion = async (audioFile, text) => {
    try {
      const sql = "INSERT INTO questions (audioFile, text) VALUES ('fss',?)";
      const values = [ text];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteQuestion = async (id) => {
    try {
      const sql = "DELETE FROM questions WHERE id = ?";
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

  createResponses = async (questionID, ...responses) => {
    try {
      const sql =
        "INSERT INTO questionresponses (questionID, text, isCorrect) VALUES (?,?,0)";
      responses.forEach(async (response) => {
        const values = [questionID, response];
        await conn.awaitQuery(sql, values);
      });
    } catch (err) {
      throw err;
    }
  };

  getResponses = async (questionID) => {
    try {
      const sql = "SELECT * FROM questionresponses WHERE questionID = ?";
      const values = [questionID];
      const result = await conn.awaitQuery(sql, values);
      return [result];
    } catch (err) {
      throw err;
    }
  };
}
