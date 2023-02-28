import React, {useState, useContext} from 'react';
import ToBackend from '../AxiosURL/ToBackend';
import { SessionContext } from '../../Context/Session/Session';
function useFetchUsers() {
    const [Response, setResponse] = useState("");    
    const { FetchData, setFetchData ,userListData, setUserlistData} = useContext(SessionContext);
   
    
    const Fetch= async ( sessionID,userID,page)=>{
        const body =JSON.stringify({
                uid: userID
              }); 
      console.log("in Fetch",body);
       const response = await ToBackend.post(`/getusers/${page}`, 
         body
       ,{
         headers: {
         'Content-Type': 'application/json',
         'sessionID' : sessionID
         }
       }
       );   
       setResponse(response);
       setFetchData(response);
       setUserlistData(response);
       console.log(response);
       return Fetch;
     }
  return [Response, Fetch];
}

export default useFetchUsers;
