import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:5000/api`,
    headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization', 
        'Content-Type': 'application/json',
    }
})

export class apiHandler {


    async verifyUser(user)  {
        try{
        let response =  await api.post('/login', user);
        return response
        }catch(err){
            return err.response
        }

}

async updateUser(user)  {
    try{
    let response =  await api.put(`/user/update-data/${user.id}`, user);
    return response
    }catch(err){
        return err.response
    }
}

async updateUserPassword(user) {
    try{
        let response =  await api.put(`/user/update-password/${user.id}`, user);
        return response
        }catch(err){
            return err.response
        }
}

async deleteUser(userID)  {
    try{
    let response =  await api.delete(`/user/delete/${userID}`);
    return response
    }catch(err){
        return err.response; 
    }
}
}