import express from 'express'
import { User } from '../../models/User.js'

const user = new User();

export const registerRoute = express.Router();



const registerUser = async (req, res) => {
    const {username, email, phone, password } = req.body
    const result = await user.getUserByEmail(email)
    if(result.length > 0){
        res.status(210).send("This email address is already registered")
    }else{
       await user.createUser(username, email, phone, password)
       res.status(201).send("user registered")   
    }
}



registerRoute.post("/register", registerUser)
