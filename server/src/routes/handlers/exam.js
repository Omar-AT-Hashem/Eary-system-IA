import express from "express";
import { Exam } from "../../models/Exam.js";
import { User } from "../../models/User.js";

export const examRoute = express.Router();

const exam = new Exam();
const user = new User()

const index = async (req, res) => {
  try {
    const result = await exam.index();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).send("Not found");
    throw err;
  }
};

const getExam = async (req, res) => {
  try{
    const id = req.params.id;
    const result = await exam.getExam(id);
    res.status(200).json(result);
  }catch(err){
    res.status(404).send(err.message);
  }
};

const createExam = async (req, res) => {
  try {
    let { questionIDs, grade} = req.body
    questionIDs = JSON.parse(questionIDs)
    const userID = req.headers.userid
    // creates the exam
    const result = await exam.createExam(userID);
    const examID = result.insertId;
    //links the exam questions to the exam
    await exam.createExamQuestions(examID, questionIDs)
    await user.addToHistory(examID, userID, grade)
    res.status(201).json({message:"Exam created"});
  } catch (err) {
    res.status(400).send(err.message)
   
  }
};

const deleteExam = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await exam.deleteExam(id);
    res.send("Exam deleted");
  } catch (err) {
    res.status(403).send(err.message);
  }
};

const updateExam = async (req, res) => {
  try {
    const id = req.params.id;
    await exam.getExam(id);
    let { name } = req.body;
    await exam.updateExam(id, name);
     res.send("Exam updated"); 
  } catch (err) {
    res.status(400).send(err.message)
  }
};


examRoute.get("/get/:id", getExam);
examRoute.post("/create", createExam);
examRoute.put("/updateExam/:id", updateExam);
examRoute.delete("/delete/:id", deleteExam);
