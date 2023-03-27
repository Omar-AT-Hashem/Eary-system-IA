import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { apiRouter } from "./routes/apiRouter.js";


dotenv.config();

//variable declarations
const PORT = process.env.SERVER_PORT;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors())


//routes
app.use("/api", apiRouter);


// localhost:5000
app.get("/", (req, res) => {
  res.send("server running");
});

//server
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
