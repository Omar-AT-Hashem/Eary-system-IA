import express from "express";
import { User } from "../../models/User.js";

export const userRoute = express.Router();

const user = new User();

const getUser = async (req, res) => {
  const id = req.params.id;
  const result = await user.getUser(id);
  res.json(result);
};

const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const result = await user.createUser(username, email, phone, password);
    res.send("user created");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await user.deleteUser(id);
    res.send("user deleted");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const myUser = await user.getUser(id);
    let { username, email, phone } = req.body;

    if (!username) {
      username = myUser.username;
    }
    if (!email) {
      email = myUser.email;
    }
    if (!phone) {
      phone = myUser.phone;
    }

    await user.updateUserData(id, username, email, phone);
     res.send("user updated"); 
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const updateUserPassword = async (req, res) => {
  try{
    const id = req.params.id
    const password = req.body.password
    const newPassword = req.body.newPassword
    const result = await user.updateUserPassword(id, password, newPassword)
    res.json(result)
  }
  catch(err){
    console.log(err.message);
    res.send(err.message);
  }
}

userRoute.get("/get/:id", getUser);
userRoute.post("/create", createUser);
userRoute.put("/update-data/:id", updateUserData);
userRoute.put("/update-password/:id", updateUserPassword);
userRoute.delete("/delete/:id", deleteUser);
