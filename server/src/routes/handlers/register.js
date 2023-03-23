import express from "express";


export const registerRoute = express.Router();

const index = async (req, res) => {
    res.send("Register")
}


registerRoute.get('/', index);
