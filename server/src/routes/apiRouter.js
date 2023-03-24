import express from "express";
import { userRoute } from "./handlers/user.js";
import { examRoute } from "./handlers/exam.js";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("main api route");
});

//routing
apiRouter.use("/user", userRoute);
apiRouter.use("/exam", examRoute);

