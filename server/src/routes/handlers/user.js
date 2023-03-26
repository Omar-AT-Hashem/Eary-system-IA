import express from "express";
import { User } from "../../models/User.js";
import { Auth } from "../../middleware/auth.js"
import { isAdmin } from "../../middleware/adminLoginAuth.js";
export const userRoute = express.Router();

const user = new User();
// const admin = new isAdmin();
// const auth = new Auth();


const index = async (req, res) => {
  try {
    const result = await user.index();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).send("Not found");
    throw err;
  }
};

const getUser = async (req, res) => {
  try{
    const id = req.params.id;
    const result = await user.getUser(id);
    res.status(200).send(result);
  }catch(err){
    res.status(404).send(err.message); 
  }
};

const getInActiveUsers = async (req, res) => {
  try{
    const result = await user.getInActiveUsers()
    res.status(200).json(result)
  }catch(err){
    res.status(404).send(err.message); 
  }
}

//------ possibly going to be removed and displaced with register 
const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const result = await user.createUser(username, email, phone, password);
    res.status(201).send("user created");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await user.deleteUser(id);
    res.send("user deleted");
  } catch (err) {
    res.status(403).send(err.message);
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
    res.status(400).send(err.message)
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const result = await user.updateUserPassword(id, password, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).send(err.message)
  }
};

userRoute.get("/index", index);
userRoute.get("/get/:id", getUser);
userRoute.get("/get-in-active", getInActiveUsers);
userRoute.post("/create", createUser);
userRoute.put("/update-data/:id", updateUserData);
userRoute.put("/update-password/:id", updateUserPassword);
userRoute.delete("/delete/:id",Auth, deleteUser);
