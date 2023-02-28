import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { introData } from "../../../Constants/Intro/Intro.data";

const Intro = () => {
  return (
    <section className="intro-section">
      <Container>
        <Row>
          <Col>
            <p>
              {introData}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Intro;
