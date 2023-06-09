import express from "express";
import { userRoute } from "./handlers/user.js";
import { examRoute } from "./handlers/exam.js";
import { questionRoute } from "./handlers/question.js";
import { registerRoute } from "./handlers/register.js";
import { loginRoute } from "./handlers/login.js";


export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("main api route");
});



// localhost:5000/api
//routing
apiRouter.use("/user", userRoute);
apiRouter.use("/exam", examRoute);
apiRouter.use("/question", questionRoute);
apiRouter.use("/register", registerRoute);
apiRouter.use("/login", loginRoute)

