import express from "express";
import { User } from "../../models/User.js";

export const loginRoute = express.Router();

const user = new User();

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await user.getUserByEmail(email);
    if (result.length > 0) {
      const userID = result[0].id;
      const isPasswordCorrect = await user.verifyPassword(userID, password);
      if (isPasswordCorrect) {
        res
          .status(200)
          .json({ message: "login successful", userData: result[0] });
      } else {
        res.status(403).json({ message: "Wrong password" });
      }
    } else {
      res.status(404).json({ message: "This email is not registered" });
    }
  } catch (err) {
    throw err;
  }
};

// localhost:5000/api/login

loginRoute.post("/", login);
