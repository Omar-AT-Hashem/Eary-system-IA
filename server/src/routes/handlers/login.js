import express from "express";


export const loginRoute = express.Router();

const index = async (req, res) => {
    res.send("login")
}


loginRoute.get('/', index);
