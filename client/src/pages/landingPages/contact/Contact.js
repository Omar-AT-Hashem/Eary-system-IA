import React, { useState, useEffect, useRef } from "react";
import "./contact.css";
import LandingNavBar from "../../../components/navBars/LandingNavBar";
export const Contact = () =>
  // useState [intial state component]
  {
    //  const [contactUsForm, setContactUsForm]=useState(
    //   {
    //        email: '',
    //       message: '',
    //  }
    // );

    //   useEffect(()=>{ },[])
    const contactUsForm = useRef([]);

    const contactUs = (event) => {
      event.preventDefault();
    };
    return (
      <>
        <LandingNavBar />
        <div>
          <h1 className="contact-h1">contact us</h1>
          <form className="contact-form" onSubmit={(e) => contactUs(e)}>
            <div>
              <label className="contact-label" for="email">
                Email
              </label>
              <input
                className="contact-email"
                id="email"
                placeholder="plaese enter your email"
                type="email"
                required
                ref={(ref) => (contactUsForm.current[0] = ref)}
                //value={contactUsForm.email}
                //onChange={(event)=>
                //    setContactUsForm({...contactUsForm, email:event.target.value})
                // }
              />
            </div>
            <br></br>
            <div>
              <label className="contact-label" for="message">
                message
              </label>
              <textarea
                className="contact-textarea"
                rows={7}
                id="message"
                placeholder="please enter your message"
                type="text"
                required
                ref={(ref) => (contactUsForm.current[1] = ref)}
                //value={contactUsForm.message}
                // onChange={(event)=>
                //    setContactUsForm({...contactUsForm, message:event.target.value})
                // }
              />
            </div>
            <button className="contact-button">submit</button>
          </form>
        </div>
      </>
    );
  };
