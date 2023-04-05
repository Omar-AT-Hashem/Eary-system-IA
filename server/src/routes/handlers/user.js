import express from "express";
import { User } from "../../models/User.js";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/adminAuth.js";
export const userRoute = express.Router();

const user = new User();

const index = async (req, res) => {
  try {
    const result = await user.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).send("Not found");
    throw err;
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await user.getUser(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
    throw err;
  }
};

const getInActiveUsers = async (req, res) => {
  try {
    const result = await user.getInActiveUsers();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
    throw err;
  }
};


const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await user.deleteUser(id);
    res.status(200).json({ message: "user deleted" });
  } catch (err) {
    res.status(403).send(err.message);
    throw err;
  }
};

const updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const myUser = await user.getUser(id);
    let { username, email, phone, isActive } = req.body;

    if (!username) {
      username = myUser.username;
    }
    if (!email) {
      email = myUser.email;
    }
    if (!phone) {
      phone = myUser.phone;
    }
    if (!isActive) {
      isActive = myUser.isActive;
    }
    await user.updateUserData(id, username, email, phone, isActive);
    res.status(200).json({ message: "user updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
    throw err;
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const result = await user.updateUserPassword(id, password, newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
    throw err;
  }
};

const addToHistory = async (req, res) => {
  try {
    const { examID, grade } = req.body;
    const userID = req.headers.userid;
    await user.addToHistory(examID, userID, grade);
    res.status(201).json({ message: "The exam was added to the user's history" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userID = req.headers.userid;
    const result = await user.getHistory(userID);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// localhost:5000/api/user

userRoute.get("/index", index);
userRoute.get("/get/:id", getUser);
userRoute.get('/get-history', getHistory);
userRoute.get("/get-in-active", getInActiveUsers);
userRoute.post("/add-to-history",addToHistory)
userRoute.put("/update-data/:id", updateUserData);
userRoute.put("/update-password/:id", updateUserPassword);
userRoute.delete("/delete/:id", deleteUser);
