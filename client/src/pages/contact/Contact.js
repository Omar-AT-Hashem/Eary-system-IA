import React,{useState, useEffect, useRef} from 'react';
import './contact.css';
export const Contact =() =>

// useState [intial state component]
{
  //  const [contactUsForm, setContactUsForm]=useState(
     //   {
    //        email: '',
     //       message: '',
      //  }
   // );
   
 //   useEffect(()=>{ },[])
const contactUsForm= useRef([]);



const contactUs =(event) =>{
    event.preventDefault();


}
    return (
        <div 
             >
        <h1>contact us</h1>
        <form onSubmit={(e)=> contactUs(e)}>
            <div>
            <label for="email">Email</label>
            <input id="email" placeholder='plaese enter your email' type="email" 
            required
            ref={(ref)=>contactUsForm.current[0]=ref}
            //value={contactUsForm.email} 
            //onChange={(event)=>
            //    setContactUsForm({...contactUsForm, email:event.target.value})
           // }
            />
            </div>
            <br></br>
            <div>
            <label for="message">message</label>
            <textarea rows={7} id="message" placeholder='please enter your message' type="text" 
           required
           ref={(ref)=>contactUsForm.current[1]=ref}
           //value={contactUsForm.message}
            // onChange={(event)=>
            //    setContactUsForm({...contactUsForm, message:event.target.value})
           // }
            />
            </div>
            <button>submit</button>

        </form>
        </div>
    )}
       