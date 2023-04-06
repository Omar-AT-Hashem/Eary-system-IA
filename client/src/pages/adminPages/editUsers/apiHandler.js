import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:5000/api/user`,
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

    async getAllUsers()  {
        try{
        let response =  await api.get("/index");
        return response
        }catch(err){
            return err.response
        }
    }
 
async updateUser(user)  {
    try{
    let response =  await api.put(`/update-data/${user.id}`, user);
    return response
    }catch(err){
        return err.response
    }
}

async updateUserPassword(user) {
    try{
        let response =  await api.put(`/update-password/${user.id}`, user);
        return response
        }catch(err){
            return err.response
        }
}

async deleteUser(userID)  {
    try{
    let response =  await api.delete(`/delete/${userID}`);
    return response
    }catch(err){
        return err.response; 
    }
}

 async registerUser(registrationForm)  {
        try{
        let response =  await api.post('http://localhost:5000/api/register', registrationForm);
        return response
    } catch(err){
        return err.response; 
    }

 }
}