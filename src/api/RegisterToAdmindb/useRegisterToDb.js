import React, {useState} from 'react';
import ToAdminDb from '../ToAdminDb';

function useRegisterToDb() {
    const [Response, setResponse] = useState("");
    const Register= async (body)=>{
       const response = await ToAdminDb.post(process.env.React_App_BACKEND_CREATE_USER, 
         body
       ,{
         headers: {
         'Content-Type': 'application/json'
         }
       }
       ); 
       setResponse(response);
     }
  return [Response, Register];
}

export default useRegisterToDb;
