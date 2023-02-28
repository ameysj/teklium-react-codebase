import React, { useEffect, useState ,useContext} from "react";
import { Row, Col, Container, FormLabel } from "react-bootstrap";
import { AccountInfoFields } from "../../../Constants/AccountInfoPage";
import useGetAttributes from "../../../api/BackendApiCalls/useGetAtrributes";
import { SessionContext } from "../../../Context/Session/Session";
import SubscriptionDetails from "../../../components/Paypal/subscriptionDetails"
import InputPopUp from "../../../components/Popup/inputPopUp";

const ProfileContent = () => {
  const [attributes,setAttr]= useState("");
  const [uid,setUID]= useState("");
  const [SessionID,setSessionID]= useState("");
  const [Response, fetch] = useGetAttributes("");
  const {getSession} = useContext(SessionContext);
  const [status,setStatus] = useState(true);
  const [show,setShow] = useState(false);
  const [cancelReason,setCancelReason] = useState("");

  useEffect(()=>{
    getSession();
    console.log('us',status)
    getSession().then((session) => {
      if(session){
        fun(session);
      };
   
    }).catch((err) => {
      console.error("session err", err);
    });    
  },[status])
  
  const fun=async(data)=>{
    const d =await data;
    setUID(d.idToken.payload.sub);
    setSessionID(d.accessToken.jwtToken);

  }
  useEffect(()=>{
    var response="";
    const setAtrribute=async()=>{
      response= await fetch(SessionID,uid)
        // setFunc(res);
        // setloader(false);
        setAttr(response.data.user_attributes);
    }
    if(SessionID&&uid){
      setAtrribute(); 
      console.log('this happened'); 
    }else if(!SessionID ){
       setStatus(!status);
       console.log('fn',status);
    }; 

  },[SessionID || uid])

 if (attributes){
  return (
    <div>
      <Container className="profile-container">
        <h3>Account Information</h3>
        {AccountInfoFields.map(({rowID,data:rowData})=>{
          return <Row key={rowID} className="mb-3 mt-3">
            {rowData.map(({name,label})=>{
              var value="";
              if(attributes[label]){
              value = attributes[label];
              }
              return <Col key={name} lg={true} className="profile-col">
                          <label>{label} : {value} </label>
                     </Col>
            })}
                 </Row>
        })}
      </Container>
      <SubscriptionDetails setShow={setShow}/>
    </div>
  );
      }else {
        
      return <div>
              {/* loading... */}
              <br/><br/>
              <SubscriptionDetails setShow={setShow}/>
              {/* <InputPopUp  show={show} input={cancelReason} setInput={setCancelReason} setShow={setShow} /> */}
              </div>
    
    }
};

export default ProfileContent;
