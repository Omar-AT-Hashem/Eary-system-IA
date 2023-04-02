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
            throw err
        }

}

async updateUser(user)  {
    try{
    let response =  await api.put(`/user/update-data/${user.id}`, user);
    return response
    }catch(err){
        throw err
    }

}
}