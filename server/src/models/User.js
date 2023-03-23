import  conn  from "../config/database.js";
import mysql from "mysql"

export class User {
  
    insertUser = (username, password)=>{

        const sql = "INSERT INTO users set ?"
        const values = {username: username, password: password}
        

         conn.query(sql, values ,(err) =>{
            if(err){
                console.log(err);
            }
        })
    }
}