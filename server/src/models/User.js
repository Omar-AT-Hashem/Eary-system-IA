import conn from "../config/database.js";
import bcrypt from "bcrypt";

const allColumnsWithoutPassword =
  "id, username, email, phone, isActive, isAdmin, token";

export class User {
  index = async () => {
    try {
      const sql = `SELECT ${allColumnsWithoutPassword} FROM users`;
      const result = await conn.awaitQuery(sql);
      return result;
    } catch (err) {
      throw err;
    }
  };

  getUser = async (id) => {
    try {
      const sql = `SELECT ${allColumnsWithoutPassword} FROM users WHERE id = ?`;
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const sql = `SELECT ${allColumnsWithoutPassword} FROM users WHERE email = ?`;
      const values = [email];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  getInActiveUsers = async () => {
    try {
      const sql = `SELECT ${allColumnsWithoutPassword} FROM users  WHERE isActive = 0 `;
      const result = await conn.awaitQuery(sql);
      return result;
    } catch (err) {
      throw err;
    }
  };

  getUserPassword = async (userID) =>{
    try {
      const sql =
        "SELECT password FROM users WHERE id = ?";
      const values = [userID];
      const result = await conn.awaitQuery(sql, values);
      return result[0].password;
    } catch (err) {
      throw err;
    }
  }

  createUser = async (username, email, phone, password, token) => {
    try {
      password = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO users (username, email, phone, password, token) VALUES (?,?,?,?,?)";
      const values = [username, email, phone, password, token];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteUser = async (id) => {
    try {
      const sql = "DELETE FROM users WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  updateUserData = async (id, username, email, phone, isActive) => {
    try {
      const sql =
        "UPDATE users SET username = ?, email = ?, phone = ?, isActive = ? WHERE id = ?";
      const values = [username, email, phone, isActive, id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  verifyPassword = async (id, password) => {
    try {
        const sql = "SELECT password FROM users WHERE id = ?"
        const values = [id]
        const result = await conn.awaitQuery(sql, values)
        const returnedPassword = result[0].password
        const comparisonResult = await bcrypt.compare(password, returnedPassword)
        return comparisonResult
    } catch (err) {
      throw err;
    }
  };

  //TODO - test this function
  updateUserPassword = async (id, password, newPassword) => {
    try {
      const passwordHash = await this.getUserPassword(id);
      const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
      if (isPasswordCorrect) {
        newPassword = await bcrypt.hash(newPassword, 10)
        const sql = "UPDATE users SET password = ? WHERE id = ?";
        const values = [newPassword, id];
        const result = await conn.awaitQuery(sql, values);
        return { message: "password updated" };
      } else {
        return { message: "password is incorrect" };
      }
    } catch (err) {
      throw err;
    }
  };


  addToHistory = async (examID,userID, grade) =>{
    try {
      const sql =
        "INSERT INTO history (examID, userID, grade) VALUES (?,?,?)";
      const values = [examID, userID, grade];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  }

  getHistory = async (userID) =>{
    try {
      const sql =
        "SELECT * FROM history WHERE userID = ?";
      const values = [userID];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  }

  

}
