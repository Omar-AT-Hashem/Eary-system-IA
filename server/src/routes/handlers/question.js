import express from "express";
import { Question } from "../../models/Question.js";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/adminAuth.js";
import path from 'path';
import { fileURLToPath } from 'url';

import multer from 'multer'


const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadPath = path.join(__dirname, '..', '..', '..', 'audioFiles', '/');



var storage = multer.diskStorage({
  destination: function (req,file,cb){
      cb(null, uploadPath)
  },
  filename: function (req,file,cb){
      cb(null,file.originalname);
  },
});

const upload = multer({storage : storage})


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
     const audioFile = req.file 
     const {text, res1, res2, res3, res4} = req.body
     //creates the question
     const result = await question.createQuestion(audioFile.path, text);
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


// localhost:5000/api/question

questionRoute.get("/index", index);
questionRoute.get("/get/:id", getQuestion);
questionRoute.post("/create",auth, adminAuth, upload.single('audioFile'), createQuestion);
questionRoute.put("/updateExam/:id", updateQuestion);
questionRoute.delete("/delete/:id", deleteQuestion);


