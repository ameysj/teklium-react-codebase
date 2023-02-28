import React, {useState, useContext} from 'react';
import ToAdminDb from '../ToAdminDb';
import { SessionContext } from '../../Context/Session/Session';
function useGetAttributes() {
    const [Response, setResponse] = useState("");    
    const { FetchData, setFetchData ,userListData, setUserlistData} = useContext(SessionContext);
    const FetchAttributes= async (sessionID,userID )=>{
        const body =JSON.stringify({
                uid: userID
              });
       const response = await ToAdminDb.post(`/attributes`, 
         body
       ,{
         headers: {
         'Content-Type': 'application/json',
         'sessionID' : sessionID
         }
       }
       );   
       setResponse(response);
       return response;
     }
  return [Response, FetchAttributes];
}

export default useGetAttributes;
