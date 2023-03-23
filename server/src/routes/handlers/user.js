import express from "express";
import { User } from "../../models/User.js";

export const userRoute = express.Router();

const user = new User();

const index = async (req, res) => {
  res.send("user route");
};

const insertUser = (req, res) => {
  const { username, password } = req.body;
  user.insertUser(username, password);
  res.send("user created");
};

userRoute.post("/add-user", insertUser);
userRoute.get("/", index);
