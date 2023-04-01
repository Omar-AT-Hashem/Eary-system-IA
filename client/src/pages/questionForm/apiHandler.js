import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/api/question`,
    headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization', 
        'Content-Type': 'multipart/form-data',
        Authorization : `Bearer ${localStorage.getItem("token")}`,
        'userid': `${localStorage.getItem("userID")}`,
    }
})
export class apiHandler {

    async createQuestion(question)  {
        let response =  await api.post('/create', question);
        return response
    }

}