import { Container, Row, Col, Card,Button} from "react-bootstrap";
import { useState,useEffect,useContext } from "react";
import { SessionContext } from "../../Context/Session/Session";
import getSubscription from "../../api/BackendApiCalls/getSubscriptionDetails"

const SubscriptionDetails = (props)=>{
    const {setShow} = props;
    const [subscription,setSubscription] = useState({}); 
    const [isSubscribed,setIsSubscribed] = useState(true);
    const {sessionID} = useContext(SessionContext);
    const [date,setDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [isFree,setIsFree] = useState(true);
    const [loading,setLoading] = useState(true);
    const [event,setEvent] = useState("Active");

    useEffect(()=>{
        (async()=>{
           const data = await getSubscription(sessionID);
            if(data.status===200){
                const jsonData = await data.json();
                setSubscription(jsonData.subscriber)
                setIsSubscribed(true);
                setDate(jsonData.subscriber.subscription_date.split("T")[0]);
                setEndDate(jsonData.subscriber.end_date.split("T")[0]);
                if(jsonData.subscriber){
                    setIsFree(false);
                }
                switch(jsonData.subscriber.event){
                    case "BILLING.SUBSCRIPTION.UPDATED":
                            setEvent("Active");
                           break;
                   case "BILLING.SUBSCRIPTION.CANCELLED":
                            setEvent("Cancelled");
                         break;
                   default:  break;
           
                }
                setLoading(false);
            }
        })()
    },[sessionID])
    
        return ( <>
                   {
                      isSubscribed && <Container>
                        <Row>
                            <Col md={12}>
                            <Card text="center">
                                <Card.Header>Subscription Details</Card.Header>
                                <Card.Body>
                                <Card.Title>
                                    { subscription.plan_type ?? "Free" }
                                </Card.Title>
                                { <Card.Text>
                                    Status : { event }
                                </Card.Text>  }
                               { !isFree &&  <Card.Text>
                                      Start Date : {  (new Date(date)).toLocaleDateString('en-GB') ?? "N/A" }
                                </Card.Text>}
                               { !isFree && <Card.Text>
                                      Next Renewal Date : {  (new Date(endDate)).toLocaleDateString('en-GB') ?? "N/A" }
                                </Card.Text>}
                                </Card.Body>
                                <Card.Footer text="muted">
                                    {/* <Button primary onClick={setShow(true)}>Cancel Subscription</Button> */}
                                </Card.Footer>
                            </Card>   
                            </Col>
                        </Row>
                    </Container>
                    }
                </>
                
                )
}

export default SubscriptionDetails;