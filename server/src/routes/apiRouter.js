import express from "express";
import { userRoute } from "./handlers/user.js";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("main api route");
});

//routing
apiRouter.use("/user", userRoute);
