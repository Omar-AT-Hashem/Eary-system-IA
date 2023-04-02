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

    async getInActiveUsers()  {
        try{
        let response =  await api.get('/get-in-active');
        return response
        }catch(err){
            return err.response; 
        }
    }

    async updateUserData(user)  {
        try{
        let response =  await api.put(`/update-data/${user.id}`, user);
        return response
        }catch(err){
            return err.response; 
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
}