import React from 'react'
import { apiHandler } from './apiHandler'
import { useState, useEffect } from 'react'
import './style.css'
import AdminNavBar from '../../../components/navBars/AdminNavBar'


export default function ActivateUsers() {
    const api = new apiHandler
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [statusCode, setStatusCode] = useState()
    const [rerenderTrigger, setRerenderTrigger] = useState([])
    
    useEffect(() => {
        async function fetchData(){
            const result = await api.getInActiveUsers();
            setInactiveUsers(result.data)
        }
        fetchData()
    }, [])


    const handleActivate = async (e, index) => {
        let updatedUsers = inactiveUsers
        updatedUsers[index].isActive = 1
        const updatedUser = updatedUsers[index]
        const result = await api.updateUserData(updatedUser)
        updatedUsers.splice(index, 1)
        setInactiveUsers(updatedUsers)
        setStatusCode(result.status)
        setRerenderTrigger(e.target.id)
    }

    const handleDelete = async (e, index) => {
        let updatedUsers = inactiveUsers
        const result = await api.deleteUser(e.target.id)
        updatedUsers.splice(index, 1)
        setInactiveUsers(updatedUsers)
        setStatusCode(result.status)
        setRerenderTrigger(e.target.id)
    }

    console.log(inactiveUsers);

    if(!inactiveUsers){
        return <h1>loading...</h1>
    }else{
  return (
    <>
    <AdminNavBar />
    <h1>ActivateUsers</h1>
    {inactiveUsers.map((user, index)=> {
        return (
            <>
            <div className='activateUsers-single-user-data'>
                <div>-{user.username}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <button id={user.id} onClick={(e) => {handleActivate(e, index)}}>activate</button>
                <button id={user.id} onClick={(e) => {handleDelete(e, index)}}>Delete</button>
            </div>
            </>
        )
    })}
    </>
  )
}
}
