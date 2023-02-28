import React, {useContext, useState} from 'react';
import { SessionContext } from '../Session/Session';
function useCheckStatus() {
  const {sessionID,userID, 
    setUserEmail,setsessionID,
    setuserID,getSession} = useContext(SessionContext);
    const [Response, setResponse] = useState("");
    getSession().then((session) => {
      if(session){
      };
   
    }).catch((err) => {
      setsessionID("");
      setuserID("");
      console.error("session err", err);
    });    
  return [Response, Register];
}

export default useCheckStatus;
