import React,{useContext,useState,useEffect} from "react";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { ServiceCardData } from "../../../Constants/ServiceCard/serviceCard.data";
import SubscribeButton from "../../Paypal/SubscribeButton";
import { SessionContext } from "../../../Context/Session/Session";
import { Link } from "react-router-dom";
import PopUp from "../../Popup/Popup";
import useSubscriptions from "../../../hooks/useSubscription";

const Services = () => {
   
    const {getSession,sessionID,userID,userSubscription,setUserSubscription} = useContext(SessionContext);
    const [status, setStatus] = useState(null);
    const [err,setErr] = useState(null);
    const [show, setShow] = useState(false); //for popup
    const [planType,setPlanType] = useState(0);
    const [subscription,createSubscription] = useSubscriptions("");
    useEffect(() => {
        getSession().then((session) => {
          setStatus(true);
        }).catch((err) => {
          console.error("session err", err);
        });
    }, [])


  const paypalSubscribe = (plan_data,data, actions) => {

      return actions.subscription.create({
        'plan_id': plan_data.planid
        });
    };

    const paypalOnError = (err) => {
        if(err?.message){
          setErr(err);
          setShow(true);
        }
    }
    const paypalOnApprove = async(plan, data, detail) => {
      // call the backend api to store transaction details
      const {subscription} = await createSubscription(data,plan,sessionID,userID);
        setUserSubscription(subscription._id);
        setErr({message:"Transaction complete"});
        setShow(true);
    };

  return (
    <section className="service-card-section">
      <Container>
        {
           userSubscription ===""  &&  <Row>
          {ServiceCardData.map((card) => (
            <Col key={card.title} md={4}>
              <Card className="service-card">
                <Card.Img variant="top" src={`${card.image}`} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.discription}</Card.Text>
                  <Card.Text>  
                      {card.price === 0 && "Free" }
                      {card.price > 0 &&  card.currencySymbol+" "+card.price }
                  
                  </Card.Text>
                  {
                     status && (card?.price >0 
                      && card.price !== undefined) && 
                          <SubscribeButton 
                            amount = {card.price}
                            currency = "USD"
                            createSubscription={paypalSubscribe}
                            planid={card.plan_id}
                            planType={card.title}
                            onApprove={paypalOnApprove}
                            catchError={paypalOnError}
                            onError={paypalOnError}
                            onCancel={paypalOnError}
                          />     
                  }
                  {
                    !status && 
                              <button className="btn btn-outline-primary" >
                                <Link to='/register' style={{"textDecoration":"none",}} >Sign Up</Link>
                              </button>     
                  }
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        }
         { show && <PopUp showPopup={show} setShowPopup = {setShow} data={err}  /> }
      </Container>
    </section>
  );
};

export default Services;


