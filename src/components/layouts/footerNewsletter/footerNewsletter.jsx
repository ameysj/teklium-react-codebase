import React from "react";
import { Form, Button } from "react-bootstrap";

const FooterNewsletter = () => {
  return (
    <div className="footer-newsletter">
      <h3>Newsletter</h3>
      <p>Subscribe and receive the letters with latest news from us.</p>
      <Form className="newsletter-form">
        <Form.Group className="mb-3" controlId="newsletter">
          <Form.Control type="email" placeholder="Email Address" />
        </Form.Group>
        <Button className="custom-btn" type="submit">
          Subscribe
        </Button>
      </Form>
    </div>
  );
};

export default FooterNewsletter;
