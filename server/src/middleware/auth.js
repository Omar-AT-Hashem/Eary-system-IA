import { User } from "../models/User.js";

const user = new User();

const auth = async function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  const userID = req.headers.userid;
  console.log(userID);

  if (!token) {
    return res.status(403).json({ message: "access rejected..." });
  } else if (token) {
    const returnedUser = await user.getUser(userID);
    if (returnedUser.token == token) {
      next();
    } else {
      return res.status(403).json({ message: "invalid token..." });
    }
  }
};

export default auth;
