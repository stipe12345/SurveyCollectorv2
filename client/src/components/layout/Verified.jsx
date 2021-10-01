import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Verified=(props)=>{
const {email}=useParams();
const {token}=useParams();
useEffect(() => {
    const Fetch = async () => {
      try {
        const FetchForm = await axios.post("/users/verify", { email: email });
        console.log(FetchForm.data)
      } catch (err) {
        console.log(err.response.data.msg);
      }
    };
    Fetch();
  }, []);
    return <>Email verification completed!
    </>
}
export default Verified;