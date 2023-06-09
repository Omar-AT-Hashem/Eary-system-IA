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

  createQuestion = async (audioFilePath, text, setting) => {
    try {
      const path = audioFilePath.replaceAll("\\", "/");
      const sql =
        "INSERT INTO questions (audioFile, text, setting) VALUES (?,?,?)";
      const values = [path, text, setting];
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

  updateQuestion = async (id, setting, text) => {
    try {
      const sql = "UPDATE questions SET setting = ?, text = ? WHERE id = ?";
      const values = [setting, text, id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  createResponses = async (questionID, responses) => {
    try {
      const sql =
        "INSERT INTO questionresponses (questionID, text, isCorrect, priority) VALUES (?,?,?,?)";
      responses.forEach(async (response) => {
        const values = [
          questionID,
          response.response,
          response.iscorrect,
          response.priority,
        ];
        await conn.awaitQuery(sql, values);
      });
    } catch (err) {
      throw err;
    }
  };

  createResponse = async (questionID, response) => {
    try {
      const sql =
        "INSERT INTO questionresponses (questionID, text, isCorrect, priority) VALUES (?,?,?,?)";
      const values = [
        questionID,
        response.text,
        response.isCorrect,
        response.priority,
      ];
      await conn.awaitQuery(sql, values);
    } catch (err) {
      throw err;
    }
  };

  deleteResponse = async (responseID) => {
    try {
      const sql = "DELETE FROM questionresponses WHERE id = ? ";
      const values = [responseID];
      const result = await conn.awaitQuery(sql, values);
      return [result];
    } catch (err) {
      throw err;
    }
  };

  getResponses = async (questionID) => {
    try {
      const sql =
        "SELECT * FROM questionresponses WHERE questionID = ? ORDER BY priority ASC";
      const values = [questionID];
      const result = await conn.awaitQuery(sql, values);
      return [result];
    } catch (err) {
      throw err;
    }
  };
  getQuestionSettings = async () => {
    try {
      const sql = "SELECT id, setting FROM questions";
      const result = await conn.awaitQuery(sql);
      return result;
    } catch (err) {
      throw err;
    }
  };
  getQuestionResponses = async (...questionIDs) => {
    try {
      const sql = "SELECT * FROM questionresponses WHERE questionID = ?";
      const result = await Promise.all(
        questionIDs.map(async (questionID) => {
          let values = [questionID];
          const result = await conn.awaitQuery(sql, values);
          return result;
        })
      );
      return result;
    } catch (err) {
      throw err;
    }
  };

  updateQuestionRespones = async (responses) => {
    try {
      const sql =
        "UPDATE questionresponses SET text = ?, isCorrect = ?, priority = ? WHERE id = ?";
      responses.forEach(async (response) => {
        let { text, isCorrect, id, priority } = response;
        let values = [text, isCorrect, priority, id];
        await conn.awaitQuery(sql, values);
      });
    } catch (err) {
      throw err;
    }
  };
}
