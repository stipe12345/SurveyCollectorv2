import React, { useState, useEffect } from 'react';
const AwaitVerify=(props)=>{
    useEffect(()=>{
        console.log(props.location.state.props)
    })
    const resend=()=>{

    }
return(
<div>
    <p>You need to verify your email adress before using this website. If you didnt recieve your email check your spam and unwanted folders.</p>
    <p>Click on the button to resend verification mail</p>
    <p>{props.location.state.props.email}</p>
    <button onClick={resend}>Resend email</button>
</div>)
}
export default AwaitVerify;