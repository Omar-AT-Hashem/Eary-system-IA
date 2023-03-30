import React,{useState, useEffect} from "react";
import { apiHandler } from "./apiHandler";
import './forms.css';
export const LoginPage =( ) => {
    const [loginForm, setLoginForm]=useState(
        {
            email: '',
            password: '',
        }
    );

    const api = new apiHandler
    
    const login= (event)=>{
        event.preventDefault();

    }
    const [popupStyle, showPopup] = useState("hide")
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        let response = await api.login(loginForm)
        console.log(response);
        localStorage.setItem("userID", response.data.userData.id)
        localStorage.setItem("token", response.data.userData.token)
        localStorage.setItem("isActive", response.data.userData.isActive)
        localStorage.setItem("isAdmin", response.data.userData.isAdmin)
        localStorage.setItem("username", response.data.userData.username)
        localStorage.setItem("phone", response.data.userData.phone)
        localStorage.setItem("email", response.data.userData.email)
        console.log(localStorage.getItem("isActive"))
      }

    return (
    
        <div className = "cover" >
      
        <form onSubmit={handleSubmit}>
        <h1 style={{textAlign:"center"}}>Login</h1>
            <div>
            <label for="email">Email</label>
            <input  id="email" placeholder='plaese enter your email' type="email" 
            required
            value={loginForm.email}
             onChange={(event)=>
                setLoginForm({...loginForm, email:event.target.value})
            }
            />
            </div>
           
            <div>
            <label for="password">password</label>
            <input  id="password" placeholder='please enter your password' type="password" 
            required
            value={loginForm.password}
             onChange={(event)=>
                setLoginForm({...loginForm, password:event.target.value})
            }
            />
            </div>
            <button  style={{width:"100%"}} type="submit">Login</button>
            <div className = 'alt-login' >
            <br></br>
        <p className = 'text' style={{textAlign:"center"}}> Or login using </p>
        
<button type="fbutton" className = 'facebook' > facebook </button>
 <button type="gbutton" className = 'google' > google </button> </div >
        </form>
       
       
     
        </div>
    )
}