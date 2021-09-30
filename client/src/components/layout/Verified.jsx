import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Verified=(props)=>{
const {email}=useParams();
const {token}=useParams();
    return <>{email}
    </>
}
export default Verified;