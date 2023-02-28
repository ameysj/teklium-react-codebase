import React, {useState, createContext,useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../Constants/Cognito_IDs/UserPool";
import getSubscription from "../../api/BackendApiCalls/getSubscriptionDetails";

const SessionContext = createContext();

const Session = (props) => {
  const [a,sa]=useState("");
  const[userEmail, setUserEmail]= useState("");
  const[sessionID, setsessionID]= useState("");
  const[userID, setuserID]= useState("");
  const[FetchData, setFetchData]= useState("");
  const[userListData, setUserlistData]= useState("");
  const [userSubscription,setUserSubscription] = useState("");

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            resolve(err);
          }else if(session) {
            resolve(session);
            setsessionID(session.accessToken.jwtToken);
            setuserID(session.accessToken.payload.sub);
          }
        });
      } else {
        reject();
      }
    });
  };


  useEffect(()=>{
    (async()=>{
      if(sessionID!==""){
        const hasSubscription = await getSubscription(sessionID)

        if(hasSubscription.status===200){
          const {subscriber} = await hasSubscription.json();
          setUserSubscription(subscriber._id);
        } 
      }

    })()
    
  },[sessionID])

  const authenticate = async (email, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({ email, Password });

      user.authenticateUser(authDetails, {
        onSuccess:async (data) => {
          console.log("onSuccess: ", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      setUserEmail("");
      setuserID("")
      setsessionID("");
      user.signOut();
      window.location.href='/';
    }
  };
  return (
    <SessionContext.Provider value={{ authenticate, getSession, logout,
      userEmail, 
      sessionID,userID, 
      setUserEmail,setsessionID,
      setuserID, FetchData, setFetchData,
      userListData, setUserlistData,
      userSubscription,setUserSubscription,
      sa }}>
      {props.children}
    </SessionContext.Provider>
  );
};
export { Session, SessionContext };
