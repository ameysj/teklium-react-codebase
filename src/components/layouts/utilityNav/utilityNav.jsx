import React, { useContext, useState ,useEffect} from "react";
import { Container,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavigationData } from "../../../Constants/NavLinks/Navigation.Data";
import { SessionContext } from "../../../Context/Session/Session";

const UtilityNav = () => {
  const [status, setStatus] = useState(null);
  const {getSession, logout,setsessionID,
    setuserID} = useContext(SessionContext);
  const [userName,SetUsername] = useState('');
  useEffect(() => {
  getSession().then((session) => {
    console.log("Session in nav: ", session);
    setStatus(true);
    if(session){
      SetUsername(session.idToken.payload.email);
      setsessionID(session.accessToken.jwtToken);
      setuserID(session.idToken.payload.sub);
    };

  }).catch((err) => {
    console.error("session err", err);
    setStatus(false);
  });
  }, [])
  
  return (
    <section className="utility-nav">
      <Container>
        <Row>
          <Col lg={12}>
            <ul className="user-menu">
              { userName &&
              <li >
                {userName}
              </li>}
              {NavigationData.map((route)=>{
                if(userName){
                  if(!route.SignedIn){
                    return null
                  }  
                };
                if(!userName){
                  if(route.SignedIn){
                    return null
                  }
                }
                return <li key={route.name}>
                           <i className={`${route.icon}`} aria-hidden="true"></i>{" "}
                           <Link to={`${route.to}`}>{route.name}</Link>
                       </li>
              })}
              {status && <li>
                <i className="bi bi-box-arrow-right"></i>{" "}
                <Link to='/' onClick={logout}>Log-out </Link>
              </li>}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UtilityNav;
