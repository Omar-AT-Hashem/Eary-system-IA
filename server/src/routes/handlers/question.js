import express from "express";
import { Question } from "../../models/Question.js";
import storeAudioFile from "../../utilities/storeAudioFile.js"


export const questionRoute = express.Router();


const question = new Question();

const index = async (req, res) => {
  try {
    const result = await question.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).send("Not found");
    throw err;
  }
};

const getQuestion = async (req, res) => {
  try{
    const id = req.params.id;
    const returnedQuestion = await question.getQuestion(id);
    const [returnedResponses] = await question.getResponses(id)
    const result = { returnedQuestion, returnedResponses}
    res.status(200).json(result);
  }catch(err){
    res.status(404).send(err.message);
  }
};

const createQuestion = async (req, res) => {
  try {
     const audioFile = req.body.audioFile
     const {text, res1, res2, res3, res4} = req.body
     //creates the question
     const result = await question.createQuestion(audioFile, text);
    const questionID = result.insertId
    //creates the responses for the question
    await question.createResponses(questionID, res1, res2, res3, res4)
    res.status(200).send("question created");
  } catch (err) {
    res.status(400).send(err.message)
   
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await question.deleteQuestion(id);
    res.send("Question deleted");
  } catch (err) {
    res.status(403).send(err.message);
  }
};

// TODO - implement update question
const updateQuestion = async (req, res) => {
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

questionRoute.get("/index", index);
questionRoute.get("/get/:id", getQuestion);
questionRoute.post("/create", createQuestion);
questionRoute.put("/updateExam/:id", updateQuestion);
questionRoute.delete("/delete/:id", deleteQuestion);


