import conn from "../config/database.js";
import bcrypt from "bcrypt";

export class User {
  index = async () => {
    try {
      const sql = "SELECT * FROM users";
      const result = await conn.awaitQuery(sql);
      return result;
    } catch (err) {
      throw err;
    }
  };

  getUser = async (id) => {
    try {
      const sql = "SELECT * FROM users WHERE id = ?";
      const values = [id];
      const result = await conn.awaitQuery(sql, values);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const values = [email];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  createUser = async (username, email, phone, password) => {
    try {
      password = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO users (username, email, phone, password ) VALUES (?,?,?,?)";
      const values = [username, email, phone, password];
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

  updateUserData = async (id, username, email, phone) => {
    try {
      const sql =
        "UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?";
      const values = [username, email, phone, id];
      const result = await conn.awaitQuery(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };

  //TODO - test this function
  updateUserPassword = async (id, password, newPassword) => {
    try {
      const myUser = await this.getUser(id);
      const passwordHash = myUser.password;
      const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
      if (isPasswordCorrect) {
        const sql = "UPDATE users SET password = ?";
        const values = [newPassword];
        const result = await conn.awaitQuery(sql, values);
        return { message: "password updated" };
      } else {
        return { message: "password is incorrect" };
      }
    } catch (err) {
      throw err;
    }
  };
}
