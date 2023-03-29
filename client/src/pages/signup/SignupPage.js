import React,{useState, useEffect} from "react";
import  './forms.css';
export const SignupPage =( ) => {
  <title>Sign Up Page</title>
  const [SignupForm, setSignupForm]=useState(
      {   name: '',
          email: '',
          password: '',
          confirmPassword:'',
      }
  );
  const [errors, setErrors] = useState({});
  const Signup= (event)=>{
    event.preventDefault();
    if (SignupForm.password !== SignupForm.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }

}
const [popupStyle, showPopup] = useState("hide")
const popup = () => {
    showPopup("signup-popup")
    setTimeout(() => showPopup("hide"), 3000)
}

return (
    
  <div className = "cover" >
  <h1>Signup</h1>
  <form onSubmit={(e)=> Signup(e)}>
  <div>
      <label for="name">Name</label>
      <input id="name" name='name' placeholder='plaese enter your name' type="text" 
      required
      value={SignupForm.name}
       onChange={(event)=>
          setSignupForm({...SignupForm, name:event.target.value})
      }
      />
      </div>
   




      <div>
      <label for="email">Email</label>
      <input name='email'  id="email" placeholder='plaese enter your email' type="email" 
      required
      value={SignupForm.email}
       onChange={(event)=>
          setSignupForm({...SignupForm, email:event.target.value})
      }
      />
      </div>
      
      <div>
      <label for="password">password</label>
      <input name='password' id="password" placeholder='please enter your password' type="password" 
      required
      value={SignupForm.password}
       onChange={(event)=>
          setSignupForm({...SignupForm, password:event.target.value})
      }
      />
      </div>
      {errors.confirmPassword && (
          <div style={{ color: "red" }}>{errors.confirmPassword}</div>
        )}
      
      <div>
      <label for="confirmPassword">confirm-password</label>
      <input  name='confirmPassword' id="confirmPassword" placeholder='please re-enter your password' type="password" 
      required
      value={SignupForm.confirmPassword}
       onChange={(event)=>
          setSignupForm({...SignupForm, confirmPassword:event.target.value })
      }  />

   </div>
 
      <button  style={{width:"100%"}} type='submit'>Signup</button>
      <div className = 'alt-login' >
            <br></br>
        <p className = 'text' style={{textAlign:"center"}}> Or signup using </p>
        
<button type="fbutton" className = 'facebook' > facebook </button>
 <button type="gbutton" className = 'google' > google </button> </div >
  </form>
  </div>

)}
