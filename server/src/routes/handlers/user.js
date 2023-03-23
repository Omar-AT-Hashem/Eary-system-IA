import express from "express";


export const userRoute = express.Router();

const index = async (req, res) => {
    res.send("user route")
}


userRoute.get('/', index);
