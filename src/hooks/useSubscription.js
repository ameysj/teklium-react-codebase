import {useState} from 'react';

const useSubscriptions = () =>{

    const [Response, setResponse] = useState("");
    
    const createSubscription = async(data,planType,sessionID,userID)=>{
        const dt = new Date();
        const ts_next_month = dt.setMonth(dt.getMonth() + 1);
        const requestData = JSON.stringify({
            "order_id"  :  data['orderID'],
            "transaction_id" :  data['subscriptionID'],
            "subscription_date" : new Date().toISOString(),
            "plan_type" :planType.planType,
            "plan_id":planType.planid,
            "end_date" : new Date(ts_next_month).toISOString(),
            "charged_duration" : 1,
            "falicitator_access_token": data['facilitatorAccessToken'],
            "uid": userID})

        const result  = await fetch(`${process.env.REACT_APP_PORT}/payments/subscribe`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'sessionID' : sessionID
            },
            body:requestData
          });

          const jsonResult = await result.json();
          setResponse(jsonResult);
          return jsonResult;
    }
    return [Response,createSubscription];
}

export default useSubscriptions;