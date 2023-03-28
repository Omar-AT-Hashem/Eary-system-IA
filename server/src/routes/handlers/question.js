import express from "express";
import { Question } from "../../models/Question.js";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/adminAuth.js";
import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "audioFiles",
  "/"
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const questionRoute = express.Router();

const question = new Question();

const index = async (req, res) => {
  try {
    const result = await question.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
    throw err;
  }
};

const getQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const returnedQuestion = await question.getQuestion(id);
    const [returnedResponses] = await question.getResponses(id);
    const result = { returnedQuestion, returnedResponses };
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createQuestion = async (req, res) => {
  try {
    const audioFile = req.file;
    const filePath = "/audioFiles/" + audioFile.originalname
    const { text, setting, res1, res2, res3, res4 } = req.body;
    //creates the question
    const result = await question.createQuestion(filePath, text, setting);
    const questionID = result.insertId;
    //creates the responses for the question
    await question.createResponses(questionID, res1, res2, res3, res4);
    res.status(200).json({ message: "question created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await question.deleteQuestion(id);
    res.send("Question deleted");
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

// TODO - implement update question
const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await exam.getExam(id);
    let { name } = req.body;
    await exam.updateExam(id, name);
    res.status(200).json({ message: "Exam updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// localhost:5000/api/question

questionRoute.get("/index", index);
questionRoute.get("/get/:id", getQuestion);
questionRoute.post("/create",auth,adminAuth,upload.single("audioFile"),createQuestion);
questionRoute.put("/updateExam/:id", updateQuestion);
questionRoute.delete("/delete/:id", auth, adminAuth, deleteQuestion);
