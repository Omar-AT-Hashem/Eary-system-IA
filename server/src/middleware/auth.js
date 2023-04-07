import { User } from "../models/User.js";

const user = new User();

const auth = async function (req, res, next) {
  console.log(req.headers);
  let token = null
  if(req.headers.authorization){
   token = req.headers.authorization.split(' ')[1];
  }
  else{
    return  res.status(403).json({ message: "access rejected..." });
  }
  const userID = req.headers.userid;
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
