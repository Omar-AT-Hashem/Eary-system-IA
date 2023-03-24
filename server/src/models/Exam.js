import conn from "../config/database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { SALT_ROUNDS } = process.env;

export class Exam {
  getExam = async (id) => {
    let row;
    try {
      const sql = "SELECT * FROM Exam WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  createExam = async (userID, name) => {
    try {
      const sql =
        "INSERT INTO Exam (userID, name ) VALUES (?,?)";
      const values = [userID, name];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteExam = async (id) => {
    try {
      const sql = "DELETE FROM Exam WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  updateExam = async (userID, name) => {
    try {
      const sql =
        "UPDATE Exam SET userID = ?, name = ?, WHERE id = ?";
      const values = [userID, name];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  
}
