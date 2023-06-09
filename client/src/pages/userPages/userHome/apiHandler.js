import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:5000/api/question`,
    headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization', 
        'Content-Type': 'application/json',
        Authorization : `Bearer ${localStorage.getItem("token")}`,
        'userid': `${localStorage.getItem("userID")}`,
    }
})

export class apiHandler {


    async getQuestions()  {
        try{
        let response =  await api.get('/index');
        return response
        }catch(err){
            return err.response;   
        }
    }
    async getResponses(questionIDs)  {
        try{
        let response =  await api.post('/get-responses', {questionIDs: questionIDs});
        return response
        }catch(err){
            return err.response; 
        }
    }
    
    async updateQuestion(questionID, question)  {
        try{
        let response =  await api.put(`/update/${questionID}`, question);
        return response
        }catch(err){
            return err.response; 
        }
    }

    async deleteQuestion(questionID)  {
        try{
        let response =  await api.delete(`/delete/${questionID}`);
        return response
        }catch(err){
            return err.response; 
        }
    }

    async updateResponses(relatedResponses){
        try{
            let response =  await api.put('/update-responses', {responses: relatedResponses});
            return response
            }catch(err){
                return err.response; 
            }
    }
    
}