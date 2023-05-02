import express, { json, text } from "express";
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
  "..",
  "client",
  "public",
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
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
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
    const filePath = "/audioFiles/" + audioFile.originalname;
    let { text, setting, responses } = req.body;
    //creates the question
    responses = JSON.parse(responses);
    // res2 = JSON.parse(res2);
    // res3 = JSON.parse(res3);
    const result = await question.createQuestion(filePath, text, setting);
    const questionID = result.insertId;
    //creates the responses for the question_
    await question.createResponses(questionID, responses);
    res.status(200).json({ message: "question created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createResponse = async (req, res) => {
  console.log(req.body);
  const {text, isCorrect, questionID, priority} = req.body
  const response = {text: text, isCorrect: isCorrect, priority: priority}
  await question.createResponse(questionID, response);
  res.status(200).json({ message: "response created" });
}

const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await question.deleteQuestion(id);
    res.send("Question deleted");
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const deleteResponse = async (req, res) => {
  try {
    const id = req.params.id;
    await question.deleteResponse(id);
    res.status(200).json({ message: "Response Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    let { setting, text } = req.body;
    await question.updateQuestion(id, setting, text);
    res.status(200).json({ message: "Question updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getQuestionSettings = async (req, res) => {
  try {
    const result = await question.getQuestionSettings();
    if (result.length > 0) {
      res.status(200).json(result);
    } else if (result.length == 0) {
      res.status(404).json({ message: "No available questions" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getQuestionResponses = async (req, res) => {
  try {
    const { questionIDs } = req.body;
    const result = await question.getQuestionResponses(...questionIDs);
    if (result.length > 0) {
      res.status(200).json(result);
    } else if (result.length == 0) {
      res.status(404).json({ message: "No available responses" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateQuestionRespones = async (req, res) => {
  try {
    const { responses } = req.body;
    await question.updateQuestionRespones(responses);
    res.status(200).json({ message: "Respones Updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// localhost:5000/api/question
questionRoute.get("/index", index);
questionRoute.get("/get-settings", getQuestionSettings);
questionRoute.get("/get/:id", getQuestion);
questionRoute.post("/create", auth,adminAuth, upload.single("audioFile"), createQuestion);
questionRoute.post("/get-responses",auth, getQuestionResponses);
questionRoute.put("/update/:id",auth, adminAuth, updateQuestion);
questionRoute.put("/update-responses", auth, adminAuth, updateQuestionRespones);
questionRoute.delete("/delete/:id", auth, adminAuth, deleteQuestion);
questionRoute.delete("/delete-response/:id", auth, adminAuth, deleteResponse);
questionRoute.post("/create-response", auth, adminAuth, createResponse);