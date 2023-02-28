
 const getSubscription = async(sessionID)=>{
        const data =  await fetch(`${process.env.REACT_APP_PORT}/payments/subscribe`,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'sessionID' : sessionID
            },
            });
            
         
         return data;
}

export default getSubscription;