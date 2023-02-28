import React, { Component, useState, useContext } from "react";
import Logo from "../../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { SessionContext } from "../../../Context/Session/Session";
import { NavigationData } from "../../../Constants/NavLinks/Navigation.Data";

function Navigation() {

  const { sessionID,logout} = useContext(SessionContext);
  return (
    <Navbar expand="lg" className="main-navigation">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} className="site-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="menu-link">
          <Nav className="navbar-nav" activeKey="/">
            {NavigationData.map((navdata) => {
               if(sessionID){
                if(!navdata.SignedIn){
                  return null
                }  
              };
              if(!sessionID){
                if(navdata.SignedIn){
                  return null
                }
              }
              return <li key={navdata.name} className="nav-item">
                <Nav.Link
                  as={Link}
                  to={`${navdata.to}`}
                  className={`nav-link`}
                  key={navdata.name}
                >
                  {navdata.name}
                </Nav.Link>
              </li>
           })}
           {sessionID &&
             <li onClick={logout} className="nav-item">
             <Nav.Link className={`nav-link`}>
               Log Out
             </Nav.Link>
           </li>
           }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
