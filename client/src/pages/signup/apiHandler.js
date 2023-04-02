import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:5000/api/register`,
    headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization', 
        'Content-Type': 'application/json;charset=UTF-8',
    }
})
export class apiHandler {


    async registerUser(registrationForm)  {
        try{
        let response =  await api.post('/', registrationForm);
        return response
    } catch(err){
        return err.response; 
    }
}
}
