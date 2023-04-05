import express from 'express'
import { User } from '../../models/User.js'
import { v4 as uuid } from 'uuid';

const user = new User();

export const registerRoute = express.Router();



const registerUser = async (req, res) => {
    const {username, email, phone, password } = req.body
    const result = await user.getUserByEmail(email)
    if(result.length > 0){
        res.status(402).json({"message":"This email address is already registered"})
    }else{
       const token = uuid()
       await user.createUser(username, email, phone, password, token)
       res.status(201).json({"message":"user registered"})   
    }
}

// localhost:5000/api/register

registerRoute.post("/", registerUser)
