import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Copyright = () => {
  return (
    <section className="copy-right">
      <Container>
        <Row>
          <Col><span className="copyright-brand">Elink</span> &copy;. All Rights Reserved.</Col>
        </Row>
      </Container>
    </section>
  );
};

export default Copyright;
