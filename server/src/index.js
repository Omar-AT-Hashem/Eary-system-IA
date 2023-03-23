import express from "express";
import dotenv from "dotenv";
import { apiRouter } from "./routes/apiRouter.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
