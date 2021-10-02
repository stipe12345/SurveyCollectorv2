import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
const AwaitVerify=(props)=>{
    const history = useHistory();
    const [sent,setSent]=useEffect(false);
    const resend=async ()=>{
      await  axios.post("/users/resendemail",{email:props.location.state.props.email})
      setSent(true);
    }
return(
    props.location.state.props.isVerified?(history.push("/")):(
<div>
    <p>You need to verify your email adress before using this website. If you didnt recieve your email check your spam and unwanted folders.</p>
    <p>Click on the button to resend verification mail and return to home page</p>
    <p>{props.location.state.props.email}</p>
    <button onClick={resend}>Resend email</button>
    {sent?(<div>Email sent!</div>):(<></>)}
    <button onClick={(()=>history.push("/"))}>Return to home page</button>
</div>))
}
export default AwaitVerify;