import express from "express";
import { Exam } from "../../models/Exam.js";

export const examRoute = express.Router();

const exam = new Exam();

const getExam = async (req, res) => {
  const id = req.params.id;
  const result = await exam.getExam(id);
  res.json(result);
};

const createExam = async (req, res) => {
  try {
    const { userID , name} = req.body;
    const result = await exam.createExam( userID , name);
    res.send("Exam created");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const deleteExam = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await exam.deleteExam(id);
    res.send("Exam deleted");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const updateExam = async (req, res) => {
  try {
    const id = req.params.id;
    await exam.getExam(id);
    let {  userID , name } = req.body;

    await exam.updateExam( userID , name);
     res.send("Exam updated"); 
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};


userRoute.get("/getExam/:id", getExam);
userRoute.post("/createExam", createExam);
userRoute.put("/updateExam/:id", updateExam);
userRoute.delete("/deleteExam/:id", deleteExam);
