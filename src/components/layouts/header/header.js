import React, { Component } from "react";
import {Container,Row,Col} from 'react-bootstrap'
import Navigation from "../navigation/navigation";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header className="header-nav">
          <Container>
            <Row>
              <Col lg={12} className="no-side-padding">
                <Navigation />
              </Col>
            </Row>
          </Container>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
