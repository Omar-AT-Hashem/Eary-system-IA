import express from "express";
import { userRoute } from "./handlers/user.js";
import { registerRoute } from "./handlers/register.js";
import { loginRoute } from "./handlers/login.js";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("main api route");
});

//routing
apiRouter.use("/user", userRoute);
apiRouter.use("/register", registerRoute);
apiRouter.use("/login", loginRoute);
