import { User } from "../models/User.js";

const user= new User();

export const Auth = async function(req,res,next) {
    const token = req.body.token;
    const userID = req.body.id;

    if(!token) {
        return res.status(401).send('access rejected...')

    }
    else if (token){
         const myuser = await user.getUser(userID);
         console.log(myuser);
         if (myuser.token === token){

            next();

         }
         else {
            return res.status(400).send('invalid token...')
            
         }

    }
    
};