import { User } from "../models/User.js";

const user = new User();

const adminAuth = async function (req, res, next) {
  const userID = req.headers.userid;

  const returnedUser = await user.getUser(userID);

  if (returnedUser.isAdmin == 1) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

export default adminAuth;
